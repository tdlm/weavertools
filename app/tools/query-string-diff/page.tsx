import { Logger } from "next-axiom";
import { Metadata } from "next";
import QueryStringDiffPage from "@/components/pages/query-string-diff";

export const metadata: Metadata = {
  title: "Query String Diff",
};

const Page = () => {
  const log = new Logger();
  log.debug("Rendering page", { test: "123" });
  return (
    <div className="w-full">
      <QueryStringDiffPage />
    </div>
  );
};

export default Page;
