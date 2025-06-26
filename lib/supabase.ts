import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  created_at: string
  phone_number: string
  first_name?: string | null
  last_name?: string | null
  email?: string | null
  plan_type: 'gratis' | 'personal' | 'plus' | 'familiar' | 'empresas'
  subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled'
  subscription_start_date?: string | null
  subscription_end_date?: string | null
  ai_personality: 'empático' | 'filosófico' | 'coach' | 'espiritual'
  timezone: string
  language: string
  onboarding_completed: boolean
  last_active_at?: string | null
  family_group_id?: string | null
  monthly_conversations: number
  total_conversations: number
  conversation_reset_date: string
  is_active: boolean
}

export interface Conversation {
  id: string
  created_at: string
  user_id: string
  message_type: 'user' | 'ai' | 'system'
  content: string
  emotion_detected?: string | null
  emotion_confidence?: number | null
  category?: string | null
  exercise_triggered?: string | null
  tokens_used?: number | null
  response_time_ms?: number | null
  session_id: string
  metadata?: string | null
}

export interface EmotionalTracking {
  id: string
  created_at: string
  user_id: string
  emotion: string
  intensity: number // 1-10 scale
  trigger?: string | null
  context?: string | null
  source?: string
  trigger_event?: string | null
  date: string
  week_number: number
  month_number: number
  year: number
}

export interface Exercise {
  id: string
  created_at: string
  title: string
  description: string
  category: 'respiración' | 'journaling' | 'meditación' | 'autoestima' | 'motivación' | 'relaciones'
  duration_minutes: number
  difficulty_level: 'básico' | 'intermedio' | 'avanzado'
  content: string
  audio_url?: string | null
  is_premium: boolean
  is_active: boolean
  popularity_score: number
  price?: number | null
}

export interface UserExercise {
  id: string
  created_at: string
  user_id: string
  exercise_id: string
  started_at?: string | null
  completed_at?: string | null
  rating?: number | null
  notes?: string | null
  progress_percentage: number
  session_data?: string | null
}

export interface Report {
  id: string
  created_at: string
  user_id: string
  report_type: 'weekly' | 'monthly'
  period_start: string
  period_end: string
  emotional_summary: Record<string, unknown> // JSON object
  exercises_completed: number
  conversations_count: number
  mood_trends: Record<string, unknown> // JSON object
  pdf_url?: string | null
  generated_at: string
}

export interface FamilyGroup {
  id: string
  created_at: string
  name: string
  admin_user_id: string
  max_members: number
  current_members: number
}

export interface DailyMotivation {
  id: string
  created_at: string
  user_id: string
  date: string
  message: string
  delivered_at?: string | null
  opened_at?: string | null
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  is_active: boolean
}

export interface AIPersonality {
  id: string
  name: string
  description: string
  prompt_template: string
  tone: string
  response_style: string
  is_premium: boolean
  price?: number | null
} 