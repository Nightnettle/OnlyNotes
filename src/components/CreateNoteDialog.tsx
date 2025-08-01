'use client';
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { create } from 'domain';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const router = useRouter()
    const [input, setInput] = React.useState('')
    // const uploadToFireBase = useMutation({
    //     mutationFn: async(noteId: string) => {
    //         const response = await axios.post('/api/uploadToFirebase', {
    //             noteId
    //         })
    //         return response.data
    //     }
    // })
    const createNotebook = useMutation({
        mutationFn: async() => {
            const response = await axios.post('/api/createNotebook', {
                name: input
            })
            return response.data
        }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input === "") {
            window.alert("Please enter a name for your notebook")
            return
        }

        createNotebook.mutate(undefined, {
            onSuccess: ({note_id}) => {
                console.log("created new note:", {note_id})
                // hit endpoint to upload temp dalle url to perma firebase url
                // uploadToFireBase.mutate(note_id)
                router.push(`/notebook/${note_id}`)
            },
            onError: (error) => {
                console.error(error)
                window.alert("Failed to create a new notebook")
            }
        })
    }
  return (
    <Dialog>
        <DialogTrigger>
            <div className="border-dashed border-2 flex border-[#00b087] h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
                <Plus className="w-6 h-6 text-[#00b087]" strokeWidth={3}/>
                <h2 className="font-semibold text-[#00b087] sm:mt-2">New Note Book</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create New Notebook
                </DialogTitle>
                <DialogDescription>
                    Give your notebook a name.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Name...' />
                <div className="h-4"></div>
                <div className="flex items-center gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant={'secondary'} onClick={() => setInput("")}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-green-600" disabled={createNotebook.isPending}>
                        {createNotebook.isPending && (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        Create
                    </Button>
                </div> 
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog