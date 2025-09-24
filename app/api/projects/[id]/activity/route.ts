import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)

    const activities = await sql`
      SELECT * FROM activity_logs 
      WHERE project_id = ${projectId}
      ORDER BY timestamp DESC
    `

    return NextResponse.json(activities)
  } catch (error) {
    console.error("Error fetching project activity:", error)
    return NextResponse.json({ error: "Failed to fetch project activity" }, { status: 500 })
  }
}
