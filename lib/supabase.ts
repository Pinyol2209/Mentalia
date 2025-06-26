import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  created_at: string
  phone_number: string
  first_name?: string
  last_name?: string
  email?: string
  plan_type: 'gratis' | 'personal' | 'plus' | 'familiar' | 'empresas'
  subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled'
  subscription_start_date?: string
  subscription_end_date?: string
  ai_personality: 'empático' | 'filosófico' | 'coach' | 'espiritual'
  timezone: string
  language: string
  onboarding_completed: boolean
  last_active_at?: string
  family_group_id?: string
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
  emotion_detected?: string
  category?: string
  exercise_triggered?: string
  tokens_used?: number
  session_id: string
}

export interface EmotionalTracking {
  id: string
  created_at: string
  user_id: string
  emotion: string
  intensity: number // 1-10 scale
  trigger?: string
  context?: string
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
  audio_url?: string
  is_premium: boolean
  price?: number
}

export interface UserExercise {
  id: string
  created_at: string
  user_id: string
  exercise_id: string
  completed_at?: string
  rating?: number
  notes?: string
  progress_percentage: number
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
  pdf_url?: string
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
  delivered_at?: string
  opened_at?: string
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
  price?: number
} 