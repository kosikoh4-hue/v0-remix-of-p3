import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { Project } from "@/lib/db"

export async function GET() {
  try {
    const projects = await sql`
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
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, status, github_repo, discord_channel, funding_amount, start_date, end_date } = body

    const [project] = (await sql`
      INSERT INTO projects (name, description, status, github_repo, discord_channel, funding_amount, start_date, end_date)
      VALUES (${name}, ${description}, ${status || "active"}, ${github_repo}, ${discord_channel}, ${funding_amount}, ${start_date}, ${end_date})
      RETURNING *
    `) as Project[]

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
