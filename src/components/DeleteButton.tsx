'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

type Props = {
    noteId: number
}

const DeleteButton = ({noteId}: Props) => {
    const router = useRouter()
    const deleteNote = useMutation({
        mutationFn: async() => {
            const response = await axios.post("/api/deleteNote", {
                noteId
            })
            return response.data
        }
    })
    return (
    <Button 
    variant={'destructive'} 
    size='sm'
    disabled={deleteNote.isPending} 
    onClick={() => {
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if (!confirm) return
        deleteNote.mutate(undefined, {
            onSuccess: () => {
                router.push('/dashboard')
            },
            onError: (err) => {
                console.error(err)
            }
        })
    }}
    className='bg-[#F6416C]'>
        <Trash />
    </Button>
  )
}

export default DeleteButton