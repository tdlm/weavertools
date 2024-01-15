"use client";

import { useEffect, useRef, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";
import { parse } from "comment-json";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { HiOutlineUserCircle as AlertCircle } from "react-icons/hi2";
import { Textarea } from "@/components/ui/textarea";

type Args = {
  className?: string | Object;
  initialValue?: string;
  onFormatSuccess?: (json: string) => void;
  placeholder?: string;
};

export default function CodeText({
  className = "",
  initialValue = "",
  onFormatSuccess,
  placeholder = "",
}: Args) {
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    console.log("initialValue", initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (outputRef.current && inputRef.current) {
      try {
        let text = inputRef.current.value.length > 0 ? inputRef.current.value : "";
        text = text.replace(/(\r\n|\n|\r)/gm, " ");
        text = text.replace(/\s+/g, " ");

        if (text.length === 0) {
          outputRef.current.innerHTML = "";
          onFormatSuccess && onFormatSuccess("");
        }

        const json = parse(text);

        const prettyJson = prettyPrintJson.toHtml(json, {
          quoteKeys: true,
          lineNumbers: false,
          trailingCommas: true,
        });

        // Send the formatted JSON to the output.
        outputRef.current.innerHTML = prettyJson;

        // Send the raw JSON to the callback.
        onFormatSuccess && onFormatSuccess(JSON.stringify(json));
      } catch (err) {
        // Show an error message about invalid JSON.
        if (err instanceof Error) {
          setError(err?.message);
        }
      }
    }
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    setInput(event.target.value.trim() as string);
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col gap-4 px-3 py-2.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300",
        className
      )}
    >
      <Textarea
        className="break-words h-[200px] w-full"
        defaultValue={initialValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        ref={inputRef}
      />

      {error.length > 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="border p-2 rounded-md" data-component="pretty-print">
          <pre className="min-h[350px] bg-white">
            <output
              className="block json-container whitespace-pre m-0 p-2 bg-white overflow-x-auto"
              ref={outputRef}
            />
          </pre>
        </div>
      )}
    </div>
  );
}
