import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Topic {
  id: string
  title: string
  category: string
  content_type: 'short' | 'long'
  revenue_score: number
  competition_level: 'low' | 'medium' | 'high'
  avg_views: number
  estimated_cpm: number
  growth_rate?: number
  engagement_rate?: number
  trending_keywords: string[]
  optimal_upload_time?: string
  video_length_min?: number
  video_length_max?: number
  sample_channels?: any
  metadata?: any
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  display_name: string
  avg_cpm: number
  icon?: string
  description?: string
  created_at: string
}

// 주제 가져오기
export async function getTopics(contentType?: 'short' | 'long') {
  let query = supabase
    .from('topics')
    .select('*')
    .eq('is_active', true)
    .order('revenue_score', { ascending: false })

  if (contentType) {
    query = query.eq('content_type', contentType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching topics:', error)
    return []
  }

  return data as Topic[]
}

// 카테고리 가져오기
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data as Category[]
}

// 주제 추가
export async function insertTopic(topic: Partial<Topic>) {
  const { data, error } = await supabase
    .from('topics')
    .insert(topic)
    .select()
    .single()

  if (error) {
    console.error('Error inserting topic:', error)
    return null
  }

  return data as Topic
}

// 주제 업데이트
export async function updateTopic(id: string, updates: Partial<Topic>) {
  const { data, error } = await supabase
    .from('topics')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating topic:', error)
    return null
  }

  return data as Topic
}

