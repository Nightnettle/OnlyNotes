'use client'
import { NoteType } from '@/lib/db/schema'
import { useDebounce } from '@/lib/useDebounce'
import { useCompletion } from '@ai-sdk/react'
import { useMutation } from '@tanstack/react-query'
import { Extension } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import axios from 'axios'
import React from 'react'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from './ui/button'

type Props = {note: NoteType}

const TipTapEditor = ({note}: Props) => {
    const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`)
    const { completion, complete } = useCompletion({
        api: '/api/completion',
    });
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                editorState
            })
            return response.data
        }
    })
    const customShortcuts = Extension.create({
        name: 'custom-shortcuts',
        addKeyboardShortcuts() {
            return {
                'Mod-Shift-Enter': () => {
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                    complete(prompt)
                    return true
                }
            }
        }
    })
    const editor = useEditor({
        autofocus: true,
        immediatelyRender: false,
        extensions: [StarterKit, customShortcuts],
        content: editorState,
        onUpdate: ({editor}) => {
            setEditorState(editor.getHTML())
        }
    })
    const lastCompletion = React.useRef('')

    React.useEffect(() => {
        if (!completion || !editor) return
        const diff = completion.slice(lastCompletion.current.length)
        lastCompletion.current = completion
        editor.commands.insertContent(diff)
    }, [completion, editor])

    const debouncedEditorState = useDebounce(editorState, 500)
    React.useEffect(() => {
        // save to drizzle db
        if (debouncedEditorState === '') return
        saveNote.mutate(undefined, {
            onSuccess: data => {
                console.log("success update!", data)
            },
            onError: err => {
                console.error(err)
            }
        })
    }, [debouncedEditorState])
     
    return (
        <>
            <div className="flex">
                {editor && <TipTapMenuBar editor={editor} />}
                <Button disabled variant={"outline"}>
                    {saveNote.isPending ? "Saving..." : "Saved"}
                </Button>
            </div>

            <div className="prose prose-sm w-full mt-4">
                <EditorContent editor={editor}/>
            </div>
            <div className="h-4"></div>
            <span className="text-sm">
                Tip: Press{" "}
                <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + Shift + Enter</kbd>
                {" "}for AI autocomplete
            </span>
        </>
    )
}

export default TipTapEditor