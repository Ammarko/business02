import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for better TypeScript support
export const TABLES = {
  USERS: 'users',
  PROJECTS: 'projects', 
  MESSAGES: 'messages',
  PARTNERSHIPS: 'partnerships',
  RATINGS: 'ratings'
}

// Helper functions for common operations
export const supabaseHelpers = {
  // Users
  async getUser(userId) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Projects
  async getProjects(filters = {}) {
    let query = supabase
      .from(TABLES.PROJECTS)
      .select(`
        *,
        users:owner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })

    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    if (filters.stage) {
      query = query.eq('stage', filters.stage)
    }
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createProject(projectData) {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([projectData])
      .select()
    return { data, error }
  },

  // Messages
  async getMessages(userId1, userId2) {
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true })
    return { data, error }
  },

  async sendMessage(messageData) {
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .insert([messageData])
      .select()
    return { data, error }
  },

  // Partnerships
  async createPartnership(partnershipData) {
    const { data, error } = await supabase
      .from(TABLES.PARTNERSHIPS)
      .insert([partnershipData])
      .select()
    return { data, error }
  },

  async getPartnershipRequests(userId) {
    const { data, error } = await supabase
      .from(TABLES.PARTNERSHIPS)
      .select(`
        *,
        projects (*),
        users:partner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('projects.owner_id', userId)
    return { data, error }
  },

  // Ratings
  async createRating(ratingData) {
    const { data, error } = await supabase
      .from(TABLES.RATINGS)
      .insert([ratingData])
      .select()
    return { data, error }
  },

  async getUserRating(userId) {
    const { data, error } = await supabase
      .from(TABLES.RATINGS)
      .select('score')
      .eq('rated_user_id', userId)
    
    if (data && data.length > 0) {
      const average = data.reduce((sum, rating) => sum + rating.score, 0) / data.length
      return { data: { average, count: data.length }, error }
    }
    
    return { data: { average: 0, count: 0 }, error }
  }
}

