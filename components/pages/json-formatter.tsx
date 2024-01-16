"use client";

import { parseAsJson, useQueryState } from "nuqs";

import TitleHeader from "@/components/title-header";
import CodeText from "@/components/code-text";

export default function JSONFormatterPage() {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const [json, setJSON] = useQueryState("json", parseAsJson<string>());

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="JSON Formatter"
        subtitle="Paste in valid JSON and it will be formatted for you."
        url={fullURL}
      />
      <div className="sticky top-0 bg-white">
        <CodeText
          initialValue={json && json.length > 0 ? JSON.stringify(json) : ""}
          onFormatSuccess={(json) => setJSON(json)}
          placeholder="Type or paste code here..."
        />
      </div>
    </section>
  );
}
