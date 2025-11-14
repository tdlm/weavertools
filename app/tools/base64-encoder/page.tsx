import { Metadata } from "next";
import { Suspense } from "react";
import Base64EncoderPage from "@/components/pages/base64-encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder",
};

const Page = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Base64EncoderPage />
      </Suspense>
    </div>
  );
};

export default Page;
