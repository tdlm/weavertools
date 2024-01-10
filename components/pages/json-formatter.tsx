import TitleHeader from "@/components/title-header";
import CodeText from "../code-text";

export default function JSONFormatterPage() {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="JSON Formatter"
        subtitle="Paste in valid JSON and it will be formatted for you."
        url={fullURL}
      />
      <div className="sticky top-0 bg-white">
        <CodeText placeholder="Type or paste code here..." />
      </div>
    </section>
  );
}
