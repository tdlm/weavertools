"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UrlInput = {
  className?: string | Object;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
};

export default function UrlInput({
  className = "",
  label = "Name",
  name = "",
  onChange,
  placeholder = "",
  value = "",
}: UrlInput) {
  return (
    <div
      className={cn(
        "rounded-md px-3 py-2.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300",
        className
      )}
    >
      <Label htmlFor={name}>{label}</Label>

      <Input name={name} id={name} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
}
