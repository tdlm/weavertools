"use client";

import { useState } from "react";
import { Check as CheckIcon, Copy as CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Args = {
  className?: string;
  copy: string;
  onCopiedText: string;
  text: string;
  timeout?: number;
};

export default function CopyButton({
  className = "",
  copy,
  onCopiedText = "Copied",
  text = "Copy",
  timeout = 2000,
}: Args) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      className={cn(
        "flex flex-row gap-2 w-fit",
        { "bg-green-500 hover:bg-green-600": true === isCopied },
        className
      )}
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(copy);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }}
    >
      {isCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      <Separator orientation="vertical" />
      <span>{isCopied ? onCopiedText : text}</span>
    </Button>
  );
}
