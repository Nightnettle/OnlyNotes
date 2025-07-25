import MenuButton from '@/components/MenuButton'
import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Menu, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import React from 'react'
import { SiCodepen } from 'react-icons/si'

type Props = {
    editor: Editor
}

const TipTapMenuBar = ({editor}: Props) => {
    return (
        <div className="flex flex-wrap gap-2">
            <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            isDisabled={!editor.can().chain().focus().toggleBold().run()}
            icon={<Bold className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            isDisabled={!editor.can().chain().focus().toggleItalic().run()}
            icon={<Italic className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            isDisabled={!editor.can().chain().focus().toggleStrike().run()}
            icon={<Strikethrough className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            isDisabled={!editor.can().chain().focus().toggleCode().run()}
            icon={<Code className="w-6 h-6" />} />

           {[1,2, 3, 4, 5, 6].map((level) => {
                const HeadingIcon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level - 1]

                return (
                    <MenuButton
                        key={`heading-${level}`}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        isActive={editor.isActive('heading', {level})}
                        icon={<HeadingIcon className="w-6 h-6" />}
                    />
                )
           })}

            <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            icon={<List className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            icon={<ListOrdered className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            icon={<SiCodepen className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            icon={<Quote className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            isDisabled={!editor.can().chain().focus().undo().run()}
            icon={<Undo className="w-6 h-6" />} />

            <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            isDisabled={!editor.can().chain().focus().redo().run()}
            icon={<Redo className="w-6 h-6" />} />
        </div>
    )
}

export default TipTapMenuBar