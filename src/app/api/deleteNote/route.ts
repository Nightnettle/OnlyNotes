import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from 'drizzle-orm'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("unauthorised", { status: 401 })
    }
    const {noteId} = await req.json()
    const id = parseInt(noteId)
    if (Number.isNaN(id)) {
        return new NextResponse("Invalid noteId", { status: 400 })
    }

    await db.delete($notes).where(
        and(
            eq($notes.id, id),
            eq($notes.userId, userId)
        )
    )

    return new NextResponse("ok", {status: 200})
}