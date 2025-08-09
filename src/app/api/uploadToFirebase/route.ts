import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { uploadFileToFirebase } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from 'drizzle-orm'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("unauthorised", { status: 401 })
        }
        const {noteId} = await req.json()
        const id = parseInt(noteId)
        if (Number.isNaN(id)) {
            return new NextResponse("Invalid noteId", { status: 400 })
        }
        // extract dalle image url
        // save to firebase
        const notes = await db.select().from($notes).where(
            and(
                eq($notes.id, id),
                eq($notes.userId, userId)
            )
        )

        if (!notes[0].imageUrl) {
            return new NextResponse("No image url", {status: 400})
        }

        const firebase_url = await uploadFileToFirebase(notes[0].imageUrl, notes[0].name)
        
        // save firebase url to db
        await db.update($notes).set({
            imageUrl: firebase_url
        })
        .where(
            and(
                eq($notes.id, id),
                eq($notes.userId, userId)
            )
        )
        
        return new NextResponse('ok', {status: 200})
    } catch (error) {
        return new NextResponse("error", {status: 500})
    }
}