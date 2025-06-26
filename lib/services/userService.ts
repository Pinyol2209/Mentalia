import { supabase } from '../supabase'
import type { User } from '../supabase'

export class UserService {
  // Crear o obtener usuario por número de teléfono
  static async findOrCreateUser(phoneNumber: string, additionalData?: Partial<User>): Promise<User | null> {
    try {
      // Primero intentar encontrar el usuario existente
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single()

      if (existingUser && !findError) {
        return existingUser
      }

      // Si no existe, crear uno nuevo
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          phone_number: phoneNumber,
          ...additionalData
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating user:', createError)
        return null
      }

      return newUser
    } catch (error) {
      console.error('Error in findOrCreateUser:', error)
      return null
    }
  }

  // Obtener usuario por ID
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error getting user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserById:', error)
      return null
    }
  }

  // Verificar límites de conversación para usuarios gratuitos
  static async canUserChat(userId: string): Promise<{ canChat: boolean; remainingChats: number }> {
    try {
      const user = await this.getUserById(userId)
      if (!user) return { canChat: false, remainingChats: 0 }

      // Si no es plan gratuito, puede chatear sin límites
      if (user.plan_type !== 'gratis') {
        return { canChat: true, remainingChats: -1 } // -1 significa ilimitado
      }

      // Verificar si necesita reset del contador mensual
      const today = new Date().toISOString().split('T')[0]
      if (user.conversation_reset_date < today) {
        await this.resetMonthlyConversations(userId)
        return { canChat: true, remainingChats: 2 } // 3 - 1 (la que va a enviar)
      }

      const { data: settings } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'max_free_conversations')
        .single()

      const maxConversations = parseInt(settings?.value || '3')
      const remaining = maxConversations - user.monthly_conversations

      return {
        canChat: remaining > 0,
        remainingChats: Math.max(0, remaining - 1)
      }
    } catch (error) {
      console.error('Error checking chat limits:', error)
      return { canChat: false, remainingChats: 0 }
    }
  }

  // Incrementar contador de conversaciones
  static async incrementConversationCount(userId: string): Promise<boolean> {
    try {
      // Obtener valores actuales
      const { data: user } = await supabase
        .from('users')
        .select('monthly_conversations, total_conversations')
        .eq('id', userId)
        .single()

      if (user) {
        const { error } = await supabase
          .from('users')
          .update({
            monthly_conversations: (user.monthly_conversations || 0) + 1,
            total_conversations: (user.total_conversations || 0) + 1
          })
          .eq('id', userId)

        return !error
      }

      return false
    } catch (error) {
      console.error('Error incrementing conversation count:', error)
      return false
    }
  }

  // Reset conversaciones mensuales
  private static async resetMonthlyConversations(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          monthly_conversations: 0,
          conversation_reset_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', userId)

      return !error
    } catch (error) {
      console.error('Error resetting monthly conversations:', error)
      return false
    }
  }

  // Actualizar plan de usuario
  static async updateUserPlan(
    userId: string, 
    planType: User['plan_type'], 
    subscriptionEndDate?: string
  ): Promise<boolean> {
    try {
      const updateData: Partial<User> = {
        plan_type: planType,
        subscription_status: 'active',
        subscription_start_date: new Date().toISOString(),
      }

      if (subscriptionEndDate) {
        updateData.subscription_end_date = subscriptionEndDate
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId)

      return !error
    } catch (error) {
      console.error('Error updating user plan:', error)
      return false
    }
  }

  // Actualizar personalidad de IA
  static async updateAIPersonality(
    userId: string, 
    personality: User['ai_personality']
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ ai_personality: personality })
        .eq('id', userId)

      return !error
    } catch (error) {
      console.error('Error updating AI personality:', error)
      return false
    }
  }

  // Completar onboarding
  static async completeOnboarding(
    userId: string, 
    profileData: {
      first_name?: string
      last_name?: string
      email?: string
      timezone?: string
      ai_personality?: User['ai_personality']
    }
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          ...profileData,
          onboarding_completed: true
        })
        .eq('id', userId)

      return !error
    } catch (error) {
      console.error('Error completing onboarding:', error)
      return false
    }
  }

  // Obtener estadísticas del usuario
  static async getUserStats(userId: string): Promise<{
    totalConversations: number
    monthlyConversations: number
    exercisesCompleted: number
    lastActive: string | null
    planType: string
  } | null> {
    try {
      const user = await this.getUserById(userId)
      if (!user) return null

      // Obtener ejercicios completados
      const { count: exercisesCount } = await supabase
        .from('user_exercises')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .not('completed_at', 'is', null)

      return {
        totalConversations: user.total_conversations,
        monthlyConversations: user.monthly_conversations,
        exercisesCompleted: exercisesCount || 0,
        lastActive: user.last_active_at,
        planType: user.plan_type
      }
    } catch (error) {
      console.error('Error getting user stats:', error)
      return null
    }
  }

  // Obtener usuarios para informes (admin)
  static async getUsersForReporting(planType?: User['plan_type']) {
    try {
      let query = supabase
        .from('users')
        .select('id, phone_number, first_name, last_name, plan_type, created_at, last_active_at')
        .eq('is_active', true)

      if (planType) {
        query = query.eq('plan_type', planType)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting users for reporting:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getUsersForReporting:', error)
      return []
    }
  }

  // Desactivar usuario
  static async deactivateUser(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          is_active: false,
          subscription_status: 'cancelled'
        })
        .eq('id', userId)

      return !error
    } catch (error) {
      console.error('Error deactivating user:', error)
      return false
    }
  }
} 