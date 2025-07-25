// /api/createNotebook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // const authData = auth();
    // console.log(authData);
    const {has, userId} = await auth();

    if (!userId) {
        return new NextResponse('unauthorised', {status: 401})
    }

    const body = await req.json()
    const {name} = body

    const image_desc = await generateImagePrompt(name)
    console.log({image_desc})

    if (!image_desc) {
        return new NextResponse("Failed to generate image description", {status: 500})
    }

    const b64 = await generateImage(image_desc)
    if (!b64) {
        return new NextResponse("Failed to generate image", {status: 500})
    }

    // upload base64 -> firebase storage
    const firebaseUrl = await uploadFileToFirebase(b64, name)

    const note_ids = await db
    .insert($notes)
    .values({
        name,
        userId,
        imageUrl: firebaseUrl
    }).returning({
        insertedId: $notes.id
    })

    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}