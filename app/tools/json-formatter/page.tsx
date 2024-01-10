import { Metadata } from "next";
import JSONFormatterPage from "@/components/pages/json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter",
};

const Page = () => {
  return (
    <div className="w-full">
      <JSONFormatterPage />
    </div>
  );
};

export default Page;
