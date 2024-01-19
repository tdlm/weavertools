"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeText from "@/components/code-text";
import TitleHeader from "@/components/title-header";
import fetchJsonUrl from "@/lib/fetch-json-url";
import isValidUrl from "@/lib/is-valid-url";

import { Loader } from "lucide-react";

export default function JSONFormatterPage() {
  const [json, setJSON] = useState<string>("");
  const [fetchUrl, setFetchUrl] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClickFetch = async () => {
    if (!!fetchUrl && isValidUrl(fetchUrl)) {
      setError("");
      setIsFetching(true);
      try {
        const data = await fetchJsonUrl(fetchUrl);

        if (data.error) {
          setError(data.error);
          setIsFetching(false);
          return;
        }

        setJSON(data);
        setIsFetching(false);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    }
  };

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="JSON Formatter"
        subtitle="Paste in valid JSON and it will be formatted for you."
        showCopy={false}
      />
      <div className="sticky flex flex-col gap-4 top-0 bg-white">
        <div className="flex flex-row">
          <Input
            className="rounded-tr-none rounded-br-none"
            defaultValue={fetchUrl as string}
            disabled={isFetching}
            onChange={(e) => setFetchUrl(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleClickFetch();
              }
            }}
            placeholder="https://..."
            title="URL"
          />
          <Button
            className="rounded-tl-none rounded-bl-none"
            disabled={isFetching || !isValidUrl(fetchUrl)}
            onClick={handleClickFetch}
            variant={isFetching ? "ghost" : "default"}
          >
            {isFetching ? <Loader className="animate-spin" size={24} /> : "Fetch"}
          </Button>
        </div>
        <CodeText
          initialValue={json && json.length > 0 ? JSON.stringify(json) : ""}
          externalError={error}
          onFormatSuccess={(json) => setJSON(json)}
          placeholder="Type or paste code here..."
        />
      </div>
    </section>
  );
}
