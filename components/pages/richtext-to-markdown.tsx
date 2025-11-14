"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import TitleHeader from "@/components/title-header";
import CopyButton from "@/components/copy-button";
import { convertHtmlToMarkdown } from "@/lib/richtext-to-markdown";
import { cn } from "@/lib/utils";

const RichTextToMarkdownPage = () => {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");

  // Auto-expand contenteditable height
  const adjustHeight = useCallback(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.style.height = "auto";
      contentEditableRef.current.style.height = `${Math.max(200, contentEditableRef.current.scrollHeight)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [htmlContent, adjustHeight]);

  // Handle paste event - let browser handle it naturally to preserve formatting
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      // Don't prevent default - let the browser paste naturally with all formatting
      // The onInput handler will catch the change and update our state
      // This ensures rich text formatting is preserved
    },
    []
  );

  // Handle input changes
  const handleInput = useCallback(() => {
    if (contentEditableRef.current) {
      let html = contentEditableRef.current.innerHTML;
      // Normalize empty content
      if (html === "<br>" || html === "<p><br></p>" || html === "<div><br></div>") {
        html = "";
      }
      setHtmlContent(html);
    }
  }, []);

  // Convert HTML to Markdown when needed
  useEffect(() => {
    if (htmlContent && htmlContent.trim().length > 0) {
      try {
        const markdown = convertHtmlToMarkdown(htmlContent);
        setMarkdownContent(markdown);
      } catch (error) {
        console.error("Error converting to markdown:", error);
        setMarkdownContent("");
      }
    } else {
      setMarkdownContent("");
    }
  }, [htmlContent]);

  // Check if contenteditable is empty for placeholder
  const isEmpty = !htmlContent || htmlContent.trim().length === 0 || htmlContent === "<p><br></p>" || htmlContent === "<br>";

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="RichText to Markdown"
        subtitle="Paste in RichText, copy Markdown"
        url={fullURL}
        showCopy={false}
      />

      <div className="sticky top-0 bg-white">
        <div className="flex justify-end mb-4">
          <CopyButton
            text="Copy Markdown"
            copy={markdownContent || ""}
            onCopiedText="Copied Markdown"
          />
        </div>

        <div className="relative w-full">
          <div
            ref={contentEditableRef}
            contentEditable
            onPaste={handlePaste}
            onInput={handleInput}
            className={cn(
              "w-full min-h-[200px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950",
              "overflow-y-auto resize-none",
              "dark:border-slate-800 dark:focus-visible:ring-slate-300"
            )}
            style={{ minHeight: "200px" }}
            suppressContentEditableWarning
            data-placeholder="Paste rich text content here..."
          />
          {isEmpty && (
            <div
              className="absolute top-2 left-3 text-sm text-slate-500 pointer-events-none select-none"
              style={{ userSelect: "none" }}
            >
              Paste rich text content here...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RichTextToMarkdownPage;

