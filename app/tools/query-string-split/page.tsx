import { Metadata } from "next";
import QueryStringSplitPage from "@/components/pages/query-string-split";

export const metadata: Metadata = {
  title: "Query String Split",
};

const Page = () => {
  return (
    <div className="w-full">
      <QueryStringSplitPage />
    </div>
  );
};

export default Page;
