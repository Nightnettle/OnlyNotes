import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import clsx from 'clsx'
import React from 'react'

type MenuButtonProps = {
    onClick:() => void
    isActive?: boolean
    isDisabled?: boolean
    icon: React.ReactNode
    title?: string
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, isActive, isDisabled, icon, title}) => {
    const button = (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={clsx(
                "p-2 rounded hover:bg-gray-200 transition-colors",
                isActive && "bg-green-200 text-green-800",
                isDisabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {icon}
        </button>
    )

    if (!title) {
        return button
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {button}
            </TooltipTrigger>
            <TooltipContent>
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    )
        // <button
        //     onClick={onClick}
        //     disabled={isDisabled}
        //     title={title}
        //     className={clsx(
        //         'p-2 rounded hover:bg-gray-200 transition-colors',
        //         isActive && 'bg-green-200 text-green-800',
        //         isDisabled && 'opacity-50 cursor-not-allowed'
        //     )}
        // >
        //     {icon}
        // </button>
    
}

export default MenuButton