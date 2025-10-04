"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeText from "@/components/code-text";
import TitleHeader from "@/components/title-header";
import fetchJsonUrl from "@/actions/fetch-json-url";
import isValidUrl from "@/lib/is-valid-url";

import { Loader } from "lucide-react";

export default function JSONFormatterPage() {
  const [json, setJSON] = useState<string>("");
  const [fetchUrl, setFetchUrl] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClickFetch = async () => {
    console.log("handleClickFetch called with URL:", fetchUrl);
    if (!!fetchUrl && isValidUrl(fetchUrl)) {
      console.log("URL is valid, starting fetch...");
      setError("");
      setIsFetching(true);
      try {
        console.log("Calling fetchJsonUrl...");
        const data = await fetchJsonUrl(fetchUrl);
        console.log("fetchJsonUrl returned:", data);

        if (data && data.error) {
          console.log("Error in response:", data.error);
          setError(data.error);
          setIsFetching(false);
          return;
        }

        console.log("Setting JSON data:", data);
        setJSON(data);
        setIsFetching(false);
      } catch (err) {
        console.error("Caught error:", err);
        setError("Failed to fetch JSON: " + (err as Error).message);
        setIsFetching(false);
      }
    } else {
      console.log("URL is invalid or empty:", fetchUrl);
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
            value={fetchUrl}
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
          initialValue={json && typeof json === 'object' ? JSON.stringify(json, null, 2) : ""}
          externalError={error}
          onFormatSuccess={(json) => setJSON(json)}
          placeholder="Type or paste code here..."
        />
      </div>
    </section>
  );
}
