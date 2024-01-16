"use client";

import CopyButton from "@/components/copy-button";

type Args = {
  title: string;
  subtitle: string;
  url: string;
};

export default function TitleHeader({ title, subtitle, url }: Args) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex flex-row justify-end w-full">
        <CopyButton className="" copy={url} onCopiedText="Copied URL" text="Copy URL" />
      </div>
    </div>
  );
}
