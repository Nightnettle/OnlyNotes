import DeleteButton from '@/components/DeleteButton'
import SideNavigation from '@/components/SideNavigation'
import TipTapEditor from '@/components/TipTapEditor'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/clerk-server'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        noteId: string
    }
}

const NotebookPage = async ({params: {noteId}}: Props) => {
    const {userId} = await auth();
    if (!userId) {
        return redirect("/dashboard")
    }
    const user = await getUser(userId)
    
    // Get all notes for the side navigation
    const allNotes = await db.select().from($notes).where(
        eq($notes.userId, userId)
    )
    
    // Get the current note
    const notes = await db.select().from($notes).where(
        and(
            eq($notes.id, parseInt(noteId)),
            eq($notes.userId, userId)
        )
    )

    if (notes.length != 1) {
        return redirect("/dashboard")
    }

    const note = notes[0]

    return (
        <div className="min-h-screen grainy">
            <div className="flex h-screen">
                {/* Side Navigation */}
                <SideNavigation notes={allNotes} />
                
                {/* Main Content */}
                <div className="flex-1 p-8 overflow-auto dark:bg-gray-900 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto">
                        <div className="border shadow-xl border-stone-200 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-4 flex items-center transition-colors duration-300">
                            <Link href="/dashboard">
                                <Button className="bg-[#00b087] hover:bg-[#00a077]" size="sm">
                                    Back
                                </Button>
                            </Link>
                            <div className="w-3"></div>
                            <span className="font-semibold dark:text-gray-100 transition-colors duration-300">
                                {user?.firstName} {user?.lastName}
                            </span>
                            <span className="inline-block mx-1 dark:text-gray-300">/</span>
                            <span className="text-stone-500 dark:text-gray-400 font-semibold transition-colors duration-300">{note.name}</span>
                            <div className="ml-auto">
                                <DeleteButton noteId={note.id}/>
                            </div>
                        </div>

                        <div className="h-4"></div>
                        <div className="border-stone-200 dark:border-gray-600 dark:bg-gray-800 shadow-xl border rounded-lg px-6 py-8 w-full transition-colors duration-300">
                            <TipTapEditor note={note}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotebookPage