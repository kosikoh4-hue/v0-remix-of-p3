import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { Milestone } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("project_id")

    let milestones: Milestone[]

    if (projectId) {
      milestones = (await sql`
        SELECT * FROM milestones 
        WHERE project_id = ${Number.parseInt(projectId)}
        ORDER BY due_date ASC
      `) as Milestone[]
    } else {
      milestones = (await sql`
        SELECT * FROM milestones 
        ORDER BY due_date ASC
      `) as Milestone[]
    }

    return NextResponse.json(milestones)
  } catch (error) {
    console.error("Error fetching milestones:", error)
    return NextResponse.json({ error: "Failed to fetch milestones" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project_id, title, description, due_date, status } = body

    const [milestone] = (await sql`
      INSERT INTO milestones (project_id, title, description, due_date, status)
      VALUES (${project_id}, ${title}, ${description}, ${due_date}, ${status || "pending"})
      RETURNING *
    `) as Milestone[]

    return NextResponse.json(milestone, { status: 201 })
  } catch (error) {
    console.error("Error creating milestone:", error)
    return NextResponse.json({ error: "Failed to create milestone" }, { status: 500 })
  }
}
