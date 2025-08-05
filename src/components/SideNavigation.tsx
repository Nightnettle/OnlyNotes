'use client'

import { NoteType } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import { BookOpen, Home, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import CreateNoteDialog from './CreateNoteDialog'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

type Props = {
  notes: NoteType[]
}

const SideNavigation = ({ notes }: Props) => {
  const params = useParams()
  const currentNoteId = params.noteId as string
  const router = useRouter()

  return (
    <div className="w-64 h-full border-r border-stone-200 dark:border-gray-700 dark:bg-gray-800 flex flex-col transition-colors duration-300">
      <div className="p-4 border-b border-stone-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="ghost" 
            className="flex-1 justify-start flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:text-gray-100 cursor-pointer transition-colors duration-300"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="h-4 w-4 text-[#00b087]" />
            Dashboard
          </Button>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-2">
          <CreateNoteDialog inSideNav={true} />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <h3 className="mb-2 px-2 text-xs font-semibold text-stone-500 dark:text-gray-400 transition-colors duration-300">NOTEBOOKS</h3>
          <div className="space-y-1">
            {notes.map((note) => (
              <Button
                key={note.id}
                variant="ghost"
                className={cn(
                  'w-full justify-start font-normal transition-all duration-200 hover:bg-stone-100 dark:hover:bg-gray-700 hover:translate-x-1 relative cursor-pointer dark:text-gray-100',
                  parseInt(currentNoteId) === note.id && 'bg-stone-100 dark:bg-gray-700 font-medium border-l-4 border-[#00b087] pl-3 text-[#00b087] shadow-sm active-notebook'
                )}
                onClick={() => router.push(`/notebook/${note.id}`)}
              >
                {parseInt(currentNoteId) === note.id && (
                  <BookOpen className="h-3 w-3 mr-2 text-[#00b087]" />
                )}
                {note.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default SideNavigation