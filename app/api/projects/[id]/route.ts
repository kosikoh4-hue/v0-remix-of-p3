import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { Project } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)

    const [project] = await sql`
      SELECT 
        p.*,
        COUNT(m.id) as total_milestones,
        COUNT(CASE WHEN m.status = 'completed' THEN 1 END) as completed_milestones,
        CASE 
          WHEN COUNT(m.id) = 0 THEN 0
          ELSE ROUND((COUNT(CASE WHEN m.status = 'completed' THEN 1 END)::numeric / COUNT(m.id)::numeric) * 100, 2)
        END as progress_percentage
      FROM projects p
      LEFT JOIN milestones m ON p.id = m.project_id
      WHERE p.id = ${projectId}
      GROUP BY p.id
    `

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const milestones = await sql`
      SELECT * FROM milestones 
      WHERE project_id = ${projectId}
      ORDER BY due_date ASC
    `

    const recentActivity = await sql`
      SELECT * FROM activity_logs 
      WHERE project_id = ${projectId}
      ORDER BY timestamp DESC
      LIMIT 10
    `

    return NextResponse.json({
      ...project,
      milestones,
      recent_activity: recentActivity,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const body = await request.json()
    const { name, description, status, github_repo, discord_channel, funding_amount, start_date, end_date } = body

    const [project] = (await sql`
      UPDATE projects 
      SET name = ${name}, description = ${description}, status = ${status}, 
          github_repo = ${github_repo}, discord_channel = ${discord_channel}, 
          funding_amount = ${funding_amount}, start_date = ${start_date}, 
          end_date = ${end_date}, updated_at = NOW()
      WHERE id = ${projectId}
      RETURNING *
    `) as Project[]

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)

    await sql`DELETE FROM projects WHERE id = ${projectId}`

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
