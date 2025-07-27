import MenuButton from '@/components/MenuButton'
import { useCompletion } from '@ai-sdk/react'
import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import { Bold, Brain, Code, Italic, List, ListOrdered, Menu, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import React from 'react'
import { SiCodepen } from 'react-icons/si'
import HeaderDropdown from './HeaderDropdown'

type Props = {
    editor: Editor
}

const TipTapMenuBar = ({editor}: Props) => {
    const {completion, complete} = useCompletion({
        api: '/api/completion',
    })

    // Take only latest for streaming effect
    const lastCompletion = React.useRef('')
    React.useEffect(() => {
        if (!completion || !editor) return
        const diff = completion.slice(lastCompletion.current.length)
        lastCompletion.current = completion
        editor.commands.insertContent(diff)
    }, [completion, editor])
    
    return (
        <div className="flex flex-wrap gap-2">
            
            <HeaderDropdown editor={editor}/>

            <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            isDisabled={!editor.can().chain().focus().toggleBold().run()}
            icon={<Bold className="w-6 h-6" />} 
            title="Bold" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            isDisabled={!editor.can().chain().focus().toggleItalic().run()}
            icon={<Italic className="w-6 h-6" />} 
            title="Italic" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            isDisabled={!editor.can().chain().focus().toggleStrike().run()}
            icon={<Strikethrough className="w-6 h-6" />} 
            title="Strikethrough" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            isDisabled={!editor.can().chain().focus().toggleCode().run()}
            icon={<Code className="w-6 h-6" />} 
            title="Inline Code" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            icon={<List className="w-6 h-6" />}
            title="Bullet List" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            icon={<ListOrdered className="w-6 h-6" />} 
            title="Numbered List" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            icon={<SiCodepen className="w-6 h-6" />} 
            title="Code Block" />

            <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            icon={<Quote className="w-6 h-6" />} 
            title="Quote" />

            <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            isDisabled={!editor.can().chain().focus().undo().run()}
            icon={<Undo className="w-6 h-6" />} 
            title="Undo" />

            <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            isDisabled={!editor.can().chain().focus().redo().run()}
            icon={<Redo className="w-6 h-6" />} 
            title="Redo" />

            <MenuButton
            onClick={() => {
                const prompt = editor.getText().split(' ').slice(-30).join(' ')
                complete(prompt)
            }}
            icon={<Brain className="w-6 h-6" />}
            title="AI Autocomplete"
            />
        </div>
    )
}

export default TipTapMenuBar