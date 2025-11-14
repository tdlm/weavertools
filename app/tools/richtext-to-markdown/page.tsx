import { Metadata } from "next";
import RichTextToMarkdownPage from "@/components/pages/richtext-to-markdown";

export const metadata: Metadata = {
  title: "RichText to Markdown",
};

const Page = () => {
  return (
    <div className="w-full">
      <RichTextToMarkdownPage />
    </div>
  );
};

export default Page;

