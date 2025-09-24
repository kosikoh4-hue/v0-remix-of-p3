import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { ActivityLog } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("project_id")
    const limit = searchParams.get("limit") || "50"

    let activityLogs: ActivityLog[]

    if (projectId) {
      activityLogs = (await sql`
        SELECT * FROM activity_logs 
        WHERE project_id = ${Number.parseInt(projectId)}
        ORDER BY timestamp DESC
        LIMIT ${Number.parseInt(limit)}
      `) as ActivityLog[]
    } else {
      activityLogs = (await sql`
        SELECT * FROM activity_logs 
        ORDER BY timestamp DESC
        LIMIT ${Number.parseInt(limit)}
      `) as ActivityLog[]
    }

    return NextResponse.json(activityLogs)
  } catch (error) {
    console.error("Error fetching activity logs:", error)
    return NextResponse.json({ error: "Failed to fetch activity logs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project_id, activity_type, source, title, description, url, author, metadata } = body

    const [activityLog] = (await sql`
      INSERT INTO activity_logs (project_id, activity_type, source, title, description, url, author, metadata)
      VALUES (${project_id}, ${activity_type}, ${source}, ${title}, ${description}, ${url}, ${author}, ${metadata})
      RETURNING *
    `) as ActivityLog[]

    return NextResponse.json(activityLog, { status: 201 })
  } catch (error) {
    console.error("Error creating activity log:", error)
    return NextResponse.json({ error: "Failed to create activity log" }, { status: 500 })
  }
}
