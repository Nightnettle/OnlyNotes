import CreateNoteDialog from '@/components/CreateNoteDialog'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const DashboardPage = async (props: Props) => {
    
    const {userId} = await auth();
    const notes = await db.select().from($notes).where(
        eq($notes.userId, userId)
    )

    return (
    <>
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-10">
            <div className="h-14"></div>
            <div className="flex justify-between items-center md:flex-row flex-col">
                <div className="flex items-center">
                    <Link href="/">
                        <Button className="bg-[#00b087] hover:bg-[#00a077]" size="sm">
                            <ArrowLeft className="w-4 h-4" strokeWidth={3}/>
                            Back
                        </Button>
                    </Link>
                    <div className="w-4"></div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">My Notes</h1>
                    <div className="w-4"></div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <UserButton />
                    </div>
                </div>
            </div>

            <div className="h-8"></div>
            <Separator className="dark:border-gray-700" />
            <div className="h-8"></div>

            {notes.length === 0 && (
                <div className="text-center">
                    <h2 className="text-xl text-gray-500 dark:text-gray-400 transition-colors duration-300">You have no notes yet.</h2>
                </div>
            )}

            <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
                <CreateNoteDialog />
                {notes.map(note => {
                    return (
                        <a href={`/notebook/${note.id}`} key={note.id}>
                            <div className="border border-stone-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <Image
                                    width={400}
                                    height={200}
                                    alt={note.name}
                                    src={note.imageUrl || ""}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        {note.name}
                                    </h3>
                                    <div className="h-1"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>

        </div>
    </div>
    </>
  )
}

export default DashboardPage