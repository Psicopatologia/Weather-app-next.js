import { cn } from '@/utils/cn';
import React from 'react'
import { FaSearch } from "react-icons/fa";
type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearchBox(props: Props) {
    return (
        <form onSubmit={props.onSubmit} className={cn('flex items-center justify-center h-8 overflow-hidden rounded-lg', props.className)} action="">
            <input
                onChange={props.onChange}
                value={props.value} type="text"
                className='h-full bg-neutral-800  text-neutral-50 px-2 focus:outline-none'
            />
            <button className='bg-yellow-500 transition-colors hover:bg-yellow-600  p-2 border-l border-slate-900'>
                <FaSearch className='text-md text-neutral-950' />
            </button>
        </form>
    )
}