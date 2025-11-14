import { Metadata } from "next";
import { Suspense } from "react";
import QueryStringSplitPage from "@/components/pages/query-string-split";

export const metadata: Metadata = {
  title: "Query String Split",
};

const Page = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <QueryStringSplitPage />
      </Suspense>
    </div>
  );
};

export default Page;
