import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("unauthorised", { status: 401 })
        }
        const body = await req.json()
        let {noteId, editorState} = body
        if (!editorState || !noteId) {
            return new NextResponse("Missing editorState or noteId.", {status: 400})
        }

        noteId = parseInt(noteId)
        if (Number.isNaN(noteId)) {
            return new NextResponse("Invalid noteId", { status: 400 })
        }
        const notes = await db.select().from($notes).where(
            and(
                eq($notes.id, noteId),
                eq($notes.userId, userId)
            )
        )
        if (notes.length != 1) {
            return new NextResponse("Not found", {status: 404})
        }

        const note = notes[0]
        if (note.editorState !== editorState) {
            await db.update($notes).set({
                editorState
            }).where(
                and(
                    eq($notes.id, noteId),
                    eq($notes.userId, userId)
                )
            )
        }
        return NextResponse.json({
            success: true
        }, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false
        }, {status: 500})
    }
}