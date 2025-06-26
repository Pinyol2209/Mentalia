import { supabase } from '../supabase'
import type { Conversation } from '../supabase'
import { v4 as uuidv4 } from 'uuid'

export class ConversationService {
  // Crear nueva conversación
  static async createConversation(
    userId: string,
    content: string,
    messageType: 'user' | 'ai' | 'system',
    sessionId?: string,
    metadata?: {
      emotionDetected?: string
      emotionConfidence?: number
      category?: string
      exerciseTriggered?: string
      tokensUsed?: number
      responseTimeMs?: number
    }
  ): Promise<Conversation | null> {
    try {
      const conversationData = {
        user_id: userId,
        session_id: sessionId || uuidv4(),
        message_type: messageType,
        content: content,
        emotion_detected: metadata?.emotionDetected,
        emotion_confidence: metadata?.emotionConfidence,
        category: metadata?.category,
        exercise_triggered: metadata?.exerciseTriggered,
        tokens_used: metadata?.tokensUsed,
        response_time_ms: metadata?.responseTimeMs,
        metadata: metadata ? JSON.stringify(metadata) : '{}'
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert(conversationData)
        .select()
        .single()

      if (error) {
        console.error('Error creating conversation:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createConversation:', error)
      return null
    }
  }

  // Obtener conversaciones de un usuario
  static async getUserConversations(
    userId: string, 
    limit = 50, 
    offset = 0
  ): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error getting user conversations:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getUserConversations:', error)
      return []
    }
  }

  // Obtener conversaciones por sesión
  static async getSessionConversations(sessionId: string): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error getting session conversations:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getSessionConversations:', error)
      return []
    }
  }

  // Obtener estadísticas de conversaciones
  static async getConversationStats(
    userId: string, 
    dateFrom?: string, 
    dateTo?: string
  ): Promise<{
    totalMessages: number
    userMessages: number
    aiMessages: number
    emotionsDetected: string[]
    categoriesDiscussed: string[]
    averageResponseTime: number
  }> {
    try {
      let query = supabase
        .from('conversations')
        .select('message_type, emotion_detected, category, response_time_ms')
        .eq('user_id', userId)

      if (dateFrom) {
        query = query.gte('created_at', dateFrom)
      }
      if (dateTo) {
        query = query.lte('created_at', dateTo)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting conversation stats:', error)
        return {
          totalMessages: 0,
          userMessages: 0,
          aiMessages: 0,
          emotionsDetected: [],
          categoriesDiscussed: [],
          averageResponseTime: 0
        }
      }

      const userMessages = data.filter(conv => conv.message_type === 'user').length
      const aiMessages = data.filter(conv => conv.message_type === 'ai').length
      
      const emotions = [...new Set(
        data
          .filter(conv => conv.emotion_detected)
          .map(conv => conv.emotion_detected)
      )] as string[]

      const categories = [...new Set(
        data
          .filter(conv => conv.category)
          .map(conv => conv.category)
      )] as string[]

      const responseTimes = data
        .filter(conv => conv.response_time_ms)
        .map(conv => conv.response_time_ms)
      
      const averageResponseTime = responseTimes.length > 0
        ? responseTimes.reduce((a, b) => (a || 0) + (b || 0), 0) / responseTimes.length
        : 0

      return {
        totalMessages: data.length,
        userMessages,
        aiMessages,
        emotionsDetected: emotions,
        categoriesDiscussed: categories,
        averageResponseTime
      }
    } catch (error) {
      console.error('Error in getConversationStats:', error)
      return {
        totalMessages: 0,
        userMessages: 0,
        aiMessages: 0,
        emotionsDetected: [],
        categoriesDiscussed: [],
        averageResponseTime: 0
      }
    }
  }

  // Obtener últimas conversaciones para contexto de IA
  static async getConversationContext(
    userId: string, 
    sessionId: string, 
    limit = 10
  ): Promise<Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: string
  }>> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('message_type, content, created_at')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error getting conversation context:', error)
        return []
      }

      return data.reverse().map(conv => ({
        role: conv.message_type === 'user' ? 'user' : 'assistant',
        content: conv.content,
        timestamp: conv.created_at
      }))
    } catch (error) {
      console.error('Error in getConversationContext:', error)
      return []
    }
  }

  // Buscar conversaciones por contenido
  static async searchConversations(
    userId: string,
    searchTerm: string,
    limit = 20
  ): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .textSearch('content', searchTerm)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error searching conversations:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in searchConversations:', error)
      return []
    }
  }

  // Obtener conversaciones por emoción detectada
  static async getConversationsByEmotion(
    userId: string,
    emotion: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<Conversation[]> {
    try {
      let query = supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .eq('emotion_detected', emotion)
        .order('created_at', { ascending: false })

      if (dateFrom) {
        query = query.gte('created_at', dateFrom)
      }
      if (dateTo) {
        query = query.lte('created_at', dateTo)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error getting conversations by emotion:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error in getConversationsByEmotion:', error)
      return []
    }
  }

  // Obtener métricas de uso diario
  static async getDailyUsageMetrics(
    userId: string,
    days = 30
  ): Promise<Array<{
    date: string
    messageCount: number
    emotionalState: string | null
  }>> {
    try {
      const dateFrom = new Date()
      dateFrom.setDate(dateFrom.getDate() - days)

      const { data, error } = await supabase
        .from('conversations')
        .select('created_at, emotion_detected')
        .eq('user_id', userId)
        .eq('message_type', 'user')
        .gte('created_at', dateFrom.toISOString())
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error getting daily usage metrics:', error)
        return []
      }

      // Agrupar por fecha
      const dailyMetrics = new Map<string, { count: number; emotions: string[] }>()

      data.forEach(conv => {
        const date = conv.created_at.split('T')[0]
        const existing = dailyMetrics.get(date) || { count: 0, emotions: [] }
        
        existing.count++
        if (conv.emotion_detected) {
          existing.emotions.push(conv.emotion_detected)
        }
        
        dailyMetrics.set(date, existing)
      })

      // Convertir a array y calcular emoción predominante
      return Array.from(dailyMetrics.entries()).map(([date, metrics]) => {
        const predominantEmotion = metrics.emotions.length > 0
          ? metrics.emotions.sort((a, b) => 
              metrics.emotions.filter(e => e === b).length - 
              metrics.emotions.filter(e => e === a).length
            )[0]
          : null

        return {
          date,
          messageCount: metrics.count,
          emotionalState: predominantEmotion
        }
      })
    } catch (error) {
      console.error('Error in getDailyUsageMetrics:', error)
      return []
    }
  }

  // Limpiar conversaciones antiguas (GDPR compliance)
  static async cleanupOldConversations(daysToKeep = 365): Promise<boolean> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const { error } = await supabase
        .from('conversations')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (error) {
        console.error('Error cleaning up old conversations:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in cleanupOldConversations:', error)
      return false
    }
  }
} 