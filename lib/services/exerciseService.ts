import { supabase } from '../supabase'
import type { Exercise, UserExercise, EmotionalTracking } from '../supabase'

export class ExerciseService {
  // Obtener todos los ejercicios disponibles
  static async getAvailableExercises(
    category?: string,
    difficulty?: string,
    isPremium?: boolean
  ): Promise<Exercise[]> {
    try {
      let query = supabase
        .from('exercises')
        .select('*')
        .eq('is_active', true)
        .order('popularity_score', { ascending: false })

      if (category) {
        query = query.eq('category', category)
      }
      if (difficulty) {
        query = query.eq('difficulty_level', difficulty)
      }
      if (isPremium !== undefined) {
        query = query.eq('is_premium', isPremium)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting available exercises:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getAvailableExercises:', error)
      return []
    }
  }

  // Obtener ejercicio por ID
  static async getExerciseById(exerciseId: string): Promise<Exercise | null> {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', exerciseId)
        .single()

      if (error) {
        console.error('Error getting exercise:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getExerciseById:', error)
      return null
    }
  }

  // Iniciar ejercicio para un usuario
  static async startExercise(
    userId: string,
    exerciseId: string
  ): Promise<UserExercise | null> {
    try {
      const { data, error } = await supabase
        .from('user_exercises')
        .insert({
          user_id: userId,
          exercise_id: exerciseId,
          started_at: new Date().toISOString(),
          progress_percentage: 0
        })
        .select()
        .single()

      if (error) {
        console.error('Error starting exercise:', error)
        return null
      }

      // Incrementar popularidad del ejercicio
      await this.incrementExercisePopularity(exerciseId)

      return data
    } catch (error) {
      console.error('Error in startExercise:', error)
      return null
    }
  }

  // Actualizar progreso del ejercicio
  static async updateExerciseProgress(
    userExerciseId: string,
    progressPercentage: number,
    sessionData?: Record<string, unknown>
  ): Promise<boolean> {
    try {
      const updateData: Partial<{
        progress_percentage: number
        session_data: string
      }> = {
        progress_percentage: Math.min(100, Math.max(0, progressPercentage))
      }

      if (sessionData) {
        updateData.session_data = JSON.stringify(sessionData)
      }

      const { error } = await supabase
        .from('user_exercises')
        .update(updateData)
        .eq('id', userExerciseId)

      return !error
    } catch (error) {
      console.error('Error updating exercise progress:', error)
      return false
    }
  }

  // Completar ejercicio
  static async completeExercise(
    userExerciseId: string,
    rating?: number,
    notes?: string,
    emotionalState?: {
      emotion: string
      intensity: number
      context?: string
    }
  ): Promise<boolean> {
    try {
      const updateData: Partial<{
        completed_at: string
        progress_percentage: number
        rating: number
        notes: string
      }> = {
        completed_at: new Date().toISOString(),
        progress_percentage: 100
      }

      if (rating) {
        updateData.rating = rating
      }
      if (notes) {
        updateData.notes = notes
      }

      const { error } = await supabase
        .from('user_exercises')
        .update(updateData)
        .eq('id', userExerciseId)

      if (error) {
        console.error('Error completing exercise:', error)
        return false
      }

      // Si se proporciona estado emocional, registrarlo
      if (emotionalState) {
        const { data: userExercise } = await supabase
          .from('user_exercises')
          .select('user_id')
          .eq('id', userExerciseId)
          .single()

        if (userExercise) {
          await this.trackEmotion(
            userExercise.user_id,
            emotionalState.emotion,
            emotionalState.intensity,
            emotionalState.context,
            'exercise'
          )
        }
      }

      return true
    } catch (error) {
      console.error('Error in completeExercise:', error)
      return false
    }
  }

  // Obtener ejercicios del usuario
  static async getUserExercises(
    userId: string,
    completed?: boolean,
    limit = 50
  ): Promise<Array<UserExercise & { exercise: Exercise }>> {
    try {
      let query = supabase
        .from('user_exercises')
        .select(`
          *,
          exercise:exercises(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (completed !== undefined) {
        if (completed) {
          query = query.not('completed_at', 'is', null)
        } else {
          query = query.is('completed_at', null)
        }
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting user exercises:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getUserExercises:', error)
      return []
    }
  }

  // Recomendar ejercicios basados en el historial del usuario
  static async getRecommendedExercises(
    userId: string,
    limit = 5
  ): Promise<Exercise[]> {
    try {
      // Obtener IDs de ejercicios completados por el usuario
      const { data: userExercises } = await supabase
        .from('user_exercises')
        .select('exercise_id')
        .eq('user_id', userId)
        .not('completed_at', 'is', null)

      if (!userExercises || userExercises.length === 0) {
        // Si no hay historial, devolver ejercicios básicos populares
        return this.getAvailableExercises(undefined, 'básico')
      }

      // Obtener datos completos de los ejercicios
      const exerciseIds = userExercises.map(ue => ue.exercise_id)
      const { data: exercises } = await supabase
        .from('exercises')
        .select('category, difficulty_level')
        .in('id', exerciseIds)

      if (!exercises || exercises.length === 0) {
        return this.getAvailableExercises(undefined, 'básico')
      }

      // Analizar preferencias del usuario
      const categoryCount = new Map<string, number>()

      exercises.forEach(exercise => {
        categoryCount.set(
          exercise.category, 
          (categoryCount.get(exercise.category) || 0) + 1
        )
      })

      // Obtener categoría preferida
      const preferredCategory = Array.from(categoryCount.entries())
        .sort((a, b) => b[1] - a[1])[0]?.[0]

      // Obtener ejercicios recomendados
      let query = supabase
        .from('exercises')
        .select('*')
        .eq('is_active', true)
        .order('popularity_score', { ascending: false })
        .limit(limit)

      // Priorizar categoría preferida
      if (preferredCategory) {
        query = query.eq('category', preferredCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting recommended exercises:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getRecommendedExercises:', error)
      return []
    }
  }

  // Registrar estado emocional
  static async trackEmotion(
    userId: string,
    emotion: string,
    intensity: number,
    context?: string,
    source = 'manual',
    triggerEvent?: string
  ): Promise<EmotionalTracking | null> {
    try {
      const now = new Date()
      const trackingData = {
        user_id: userId,
        emotion,
        intensity,
        context,
        source,
        trigger_event: triggerEvent,
        date: now.toISOString().split('T')[0],
        week_number: this.getWeekNumber(now),
        month_number: now.getMonth() + 1,
        year: now.getFullYear()
      }

      const { data, error } = await supabase
        .from('emotional_tracking')
        .insert(trackingData)
        .select()
        .single()

      if (error) {
        console.error('Error tracking emotion:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in trackEmotion:', error)
      return null
    }
  }

  // Obtener seguimiento emocional del usuario
  static async getEmotionalTracking(
    userId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<EmotionalTracking[]> {
    try {
      let query = supabase
        .from('emotional_tracking')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (dateFrom) {
        query = query.gte('date', dateFrom)
      }
      if (dateTo) {
        query = query.lte('date', dateTo)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting emotional tracking:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getEmotionalTracking:', error)
      return []
    }
  }

  // Obtener tendencias emocionales
  static async getEmotionalTrends(
    userId: string,
    period: 'week' | 'month' = 'week'
  ): Promise<Array<{
    period: string
    averageIntensity: number
    dominantEmotion: string
    emotionCount: { [emotion: string]: number }
  }>> {
    try {
      const dateFrom = new Date()
      if (period === 'week') {
        dateFrom.setDate(dateFrom.getDate() - 7 * 8) // 8 semanas
      } else {
        dateFrom.setMonth(dateFrom.getMonth() - 6) // 6 meses
      }

      const { data, error } = await supabase
        .from('emotional_tracking')
        .select('*')
        .eq('user_id', userId)
        .gte('date', dateFrom.toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (error) {
        console.error('Error getting emotional trends:', error)
        return []
      }

      // Agrupar por período
      const groupedData = new Map<string, EmotionalTracking[]>()

      data.forEach(tracking => {
        const key = period === 'week' 
          ? `${tracking.year}-W${tracking.week_number}`
          : `${tracking.year}-${String(tracking.month_number).padStart(2, '0')}`
        
        if (!groupedData.has(key)) {
          groupedData.set(key, [])
        }
        groupedData.get(key)!.push(tracking)
      })

      // Calcular tendencias
      return Array.from(groupedData.entries()).map(([periodKey, trackings]) => {
        const emotionCount = trackings.reduce((acc, t) => {
          acc[t.emotion] = (acc[t.emotion] || 0) + 1
          return acc
        }, {} as { [emotion: string]: number })

        const averageIntensity = trackings.reduce((sum, t) => sum + t.intensity, 0) / trackings.length

        const dominantEmotion = Object.entries(emotionCount)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral'

        return {
          period: periodKey,
          averageIntensity: Math.round(averageIntensity * 100) / 100,
          dominantEmotion,
          emotionCount
        }
      })
    } catch (error) {
      console.error('Error in getEmotionalTrends:', error)
      return []
    }
  }

  // Incrementar popularidad del ejercicio
  private static async incrementExercisePopularity(exerciseId: string): Promise<void> {
    try {
      await supabase
        .from('exercises')
        .update({
          popularity_score: supabase.sql`popularity_score + 1`
        })
        .eq('id', exerciseId)
    } catch (error) {
      console.error('Error incrementing exercise popularity:', error)
    }
  }

  // Función auxiliar para calcular número de semana
  private static getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  // Obtener estadísticas de ejercicios del usuario
  static async getUserExerciseStats(userId: string): Promise<{
    totalExercises: number
    completedExercises: number
    completionRate: number
    favoriteCategory: string | null
    averageRating: number
    totalMinutes: number
  }> {
    try {
      const { data: userExercises } = await supabase
        .from('user_exercises')
        .select(`
          *,
          exercise:exercises(category, duration_minutes)
        `)
        .eq('user_id', userId)

      if (!userExercises || userExercises.length === 0) {
        return {
          totalExercises: 0,
          completedExercises: 0,
          completionRate: 0,
          favoriteCategory: null,
          averageRating: 0,
          totalMinutes: 0
        }
      }

      const completed = userExercises.filter(ex => ex.completed_at)
      const ratings = completed.filter(ex => ex.rating).map(ex => ex.rating!)
      
      // Calcular categoría favorita
      const categoryCount = new Map<string, number>()
      completed.forEach(ex => {
        const category = (ex.exercise as Exercise).category
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
      })

      const favoriteCategory = categoryCount.size > 0
        ? Array.from(categoryCount.entries()).sort((a, b) => b[1] - a[1])[0][0]
        : null

      // Calcular minutos totales
      const totalMinutes = completed.reduce((sum, ex) => {
        return sum + ((ex.exercise as Exercise).duration_minutes || 0)
      }, 0)

      return {
        totalExercises: userExercises.length,
        completedExercises: completed.length,
        completionRate: (completed.length / userExercises.length) * 100,
        favoriteCategory,
        averageRating: ratings.length > 0 
          ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length 
          : 0,
        totalMinutes
      }
    } catch (error) {
      console.error('Error getting user exercise stats:', error)
      return {
        totalExercises: 0,
        completedExercises: 0,
        completionRate: 0,
        favoriteCategory: null,
        averageRating: 0,
        totalMinutes: 0
      }
    }
  }
} 