import { Metadata } from "next";
import Base64EncoderPage from "@/components/pages/base64-encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder",
};

const Page = () => {
  return (
    <div className="w-full">
      <Base64EncoderPage />
    </div>
  );
};

export default Page;
