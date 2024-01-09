"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CopyIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Args = {
    className?: string;
    copy: string;
    onCopiedText: string;
    text: string;
    timeout?: number;
};

export default function CopyButton({ className = "", copy, onCopiedText = "Copied", text = "Copy", timeout = 2000 }: Args) {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <Button className={cn("flex flex-row gap-2 w-fit", { "bg-green-500 hover:bg-green-600": true === isCopied }, className)} size="sm" onClick={() => {
            navigator.clipboard.writeText(copy);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, timeout);
        }}>
            {isCopied ? <CheckIcon /> : <CopyIcon />}
            <Separator orientation="vertical" />
            <span>{isCopied ? onCopiedText : text}</span>
        </Button>
    )
}