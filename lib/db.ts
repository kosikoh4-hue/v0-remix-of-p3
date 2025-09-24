import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Database types
export interface Project {
  id: number
  name: string
  description?: string
  status: string
  github_repo?: string
  discord_channel?: string
  funding_amount?: number
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
  total_milestones?: number
  completed_milestones?: number
  progress_percentage?: number
}

export interface ProjectWithDetails extends Project {
  milestones: Milestone[]
  recent_activity: ActivityLog[]
}

export interface Milestone {
  id: number
  project_id: number
  title: string
  description?: string
  due_date?: string
  status: string
  completion_date?: string
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: number
  project_id: number
  source: string
  type: string
  content?: string
  url?: string
  timestamp: string
}

export interface GitHubWebhookPayload {
  action?: string
  commits?: Array<{
    message: string
    url: string
  }>
  head_commit?: {
    timestamp: string
  }
  pull_request?: {
    title: string
    html_url: string
    created_at: string
  }
  issue?: {
    title: string
    html_url: string
    created_at: string
  }
}

export interface DiscordWebhookPayload {
  content: string
  author: {
    username: string
    id: string
  }
  channel_id: string
  guild_id?: string
  id: string
  timestamp?: string
}
