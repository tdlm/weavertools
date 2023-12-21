"use client";

import { cn } from "@/lib/utils";

type UrlInput = {
    className?: string | Object,
    label?: string,
    name?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    value?: string,
}

export default function UrlInput({ className = "", label = "Name", name = "", onChange, placeholder = "", value = "" }: UrlInput) {
    return (
        <div className={cn("rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600", className)}>
            <label htmlFor={name} className="block text-xs font-medium text-gray-900">
                {label}
            </label>
            <input
                type="text"
                name={name}
                id={name}
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
