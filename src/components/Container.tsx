import { cn } from '@/utils/cn'
import React from 'react'

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                'w-full py-4 bg-neutral-800 rounded-xl flex',
                props.className
            )}
        />
    )
}