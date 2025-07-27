import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CaretDownIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons"
import type { Editor } from "@tiptap/react"
import * as React from "react"
import { Button } from "./ui/button"

type Level = 1 | 2 | 3 | 4 | 5 | 6

interface TextStyle {
    label: string
    element: keyof React.JSX.IntrinsicElements
    level?: Level
    className: string
    shortcuts: string[]
}

const formatActions: TextStyle[] = [
    {
        label: "Normal Text",
        element: "span",
        className: "grow text-base font-normal",
        shortcuts: ["Ctrl", "Alt", "0"]
    },
    {
        label: "Heading 1",
        element: "h1",
        level: 1,
        className: "grow text-2xl font-bold",
        shortcuts: ["Ctrl", "Alt", "1"]
    },
    {
        label: "Heading 2",
        element: "h2",
        level: 2,
        className: "grow text-xl font-semibold",
        shortcuts: ["Ctrl", "Alt", "2"]
    },
    {
        label: "Heading 3",
        element: "h3",
        level: 3,
        className: "grow text-lg font-semibold",
        shortcuts: ["Ctrl", "Alt", "3"]
    },
    {
        label: "Heading 4",
        element: "h4",
        level: 4,
        className: "grow text-base font-semibold",
        shortcuts: ["Ctrl", "Alt", "4"]
    },
    {
        label: "Heading 5",
        element: "h5",
        level: 5,
        className: "grow text-sm font-medium",
        shortcuts: ["Ctrl", "Alt", "5"]
    },
    {
        label: "Heading 6",
        element: "h6",
        level: 6,
        className: "grow text-sm font-medium",
        shortcuts: ["Ctrl", "Alt", "6"]
    },
]

interface HeaderDropdownProps {
    editor: Editor
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({editor}) => {
   const [isOpen, setIsOpen] = React.useState(false)

    const handleStyleChange = React.useCallback(
        (level?: Level) => {
            if (level) {
                editor.chain().focus().toggleHeading({level}).run()
            } else {
                editor.chain().focus().setParagraph().run()
            }
        },
        [editor]
    )

    const getCurrentStyle = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor.isActive("heading", {level})) {
                return `H${level}`
            }
        }
        return "Text"
    }

    const renderMenuItem = React.useCallback(
        ({label, element: Element, level, className, shortcuts}: TextStyle) => (
            <DropdownMenuItem
                key={label}
                onClick={() => handleStyleChange(level)}
                className={cn("flex flex-row items-center justify-between gap-4 cursor-pointer", {
                    "bg-accent": level
                        ? editor.isActive("heading", {level})
                        : editor.isActive("paragraph"),
                })}
                aria-label={label}
            >
                <Element className={className}>{label}</Element>
                <span className="text-xs text-muted-foreground">
                    {shortcuts.join(" + ")}
                </span>
            </DropdownMenuItem>
        ),
        [editor, handleStyleChange]
    )

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "gap-2 px-3 py-2 h-9",
                        editor.isActive("heading") && "bg-accent"
                    )}
                    aria-label="Text styles"
                >
                    <LetterCaseCapitalizeIcon className="size-5" />
                    <span className="text-sm font-medium">{getCurrentStyle()}</span>
                    <CaretDownIcon className={cn(
                        "size-5 transition-transform duration-200 ease-in-out",
                        isOpen && "rotate-180"
                    )} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
                {formatActions.map(renderMenuItem)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeaderDropdown