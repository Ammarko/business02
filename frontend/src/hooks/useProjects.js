import { useState, useEffect } from 'react'
import { supabaseHelpers } from '../lib/supabase'

export const useProjects = (filters = {}) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseHelpers.getProjects(filters)
      
      if (error) {
        setError(error.message)
        return
      }

      // Transform data to match our component expectations
      const transformedProjects = data?.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        stage: project.stage,
        category: project.category,
        location: project.city,
        skills: project.needed_skills || [],
        sharePercentage: `${project.share_percentage}%`,
        ownerName: project.users?.full_name || 'مستخدم مجهول',
        ownerRating: 4.5, // Will be calculated from ratings table later
        timePosted: getTimeAgo(project.created_at),
        ownerId: project.owner_id
      })) || []

      setProjects(transformedProjects)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [JSON.stringify(filters)])

  const createProject = async (projectData) => {
    try {
      const { data, error } = await supabaseHelpers.createProject(projectData)
      if (error) throw error
      
      // Refresh projects list
      await fetchProjects()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject
  }
}

// Helper function to calculate time ago
function getTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return 'منذ لحظات'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `منذ ${minutes} دقيقة${minutes > 1 ? '' : ''}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `منذ ${hours} ساعة${hours > 1 ? '' : ''}`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `منذ ${days} يوم${days > 1 ? '' : ''}`
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `منذ ${weeks} أسبوع${weeks > 1 ? '' : ''}`
  } else {
    const months = Math.floor(diffInSeconds / 2592000)
    return `منذ ${months} شهر${months > 1 ? '' : ''}`
  }
}

