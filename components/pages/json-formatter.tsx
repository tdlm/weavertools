"use client";

import { useQueryState } from "next-usequerystate";

import TitleHeader from "@/components/title-header";
import CodeText from "@/components/code-text";

export default function JSONFormatterPage() {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const [url, setUrl] = useQueryState("url", {
    parse: (value) => atob(decodeURIComponent(value)),
    serialize: (value) => encodeURIComponent(btoa(value)),
  });

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="JSON Formatter"
        subtitle="Paste in valid JSON and it will be formatted for you."
        url={fullURL}
      />
      <div className="sticky top-0 bg-white">
        <CodeText
          initialValue={String(url)}
          onFormatSuccess={(json) => {
            setUrl(json);
          }}
          placeholder="Type or paste code here..."
        />
      </div>
    </section>
  );
}
