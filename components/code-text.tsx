"use client";

import { useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";
import { parse } from "comment-json";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CircleUserRound as CircleUserRoundIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Args = {
  className?: string | Object;
  initialValue?: any;
  onFormatSuccess?: (json: string) => void;
  placeholder?: string;
};

export default function CodeText({
  className = "",
  initialValue = null,
  onFormatSuccess,
  placeholder = "",
}: Args) {
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<string>(initialValue);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    try {
      let text = input;

      if (input.length > 0 && "null" !== input) {
        text = text.replace(/(\r\n|\n|\r)/gm, " ");
        text = text.replace(/\s+/g, " ");
      } else {
        setInput("");
        setOutput("");
        onFormatSuccess && onFormatSuccess("");
        return;
      }

      const json = parse(text);

      const prettyJson = prettyPrintJson.toHtml(json, {
        quoteKeys: true,
        lineNumbers: false,
        trailingCommas: true,
      });

      // Send the formatted JSON to the output.
      setOutput(prettyJson);

      // Send the raw JSON to the callback.
      onFormatSuccess && onFormatSuccess(json as string);
    } catch (err) {
      // Show an error message about invalid JSON.
      if (err instanceof Error) {
        setError(err?.message);
      }
    }
  }, [input, onFormatSuccess]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    setInput(event.target.value.trim());
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
        defaultValue={input}
        onChange={handleInputChange}
        placeholder={placeholder}
      />

      {error.length > 0 ? (
        <Alert variant="destructive">
          <CircleUserRoundIcon size={20} />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="border p-2 rounded-md" data-component="pretty-print">
          <pre className="min-h[350px] bg-white">
            <output
              className="block json-container whitespace-pre m-0 p-2 bg-white overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </pre>
        </div>
      )}
    </div>
  );
}
