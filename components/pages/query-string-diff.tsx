"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "next-usequerystate";
import { DataItem } from "@/components/data-list";
import DiffList from "@/components/diff-list";
import UrlInput from "@/components/url-input";
import createDiffMap from "@/lib/create-diff-map";
import isValidUrl from "@/lib/is-valid-url";
import splitQueryString from "@/lib/split-query-string";
import CopyButton from "@/components/copy-button";
import TitleHeader from "../title-header";

const QueryStringDiffPage = () => {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const [url, setUrl] = useQueryState("url", {
    parse: (value) => atob(decodeURIComponent(value)),
    serialize: (value) => encodeURIComponent(btoa(value)),
  });

  const [compareUrl, setCompareUrl] = useQueryState("compare-url", {
    parse: (value) => atob(decodeURIComponent(value)),
    serialize: (value) => encodeURIComponent(btoa(value)),
  });

  const [queryParts, setQueryParts] = useState<DataItem[]>([]);
  const [compareQueryParts, setCompareQueryParts] = useState<DataItem[]>([]);

  useEffect(() => {
    if (!!url && url.length > 0 && isValidUrl(url)) {
      const queryData = splitQueryString(url);

      let tempQueryParts = [];

      for (const item in queryData) {
        tempQueryParts.push({ key: item, value: queryData[item as keyof typeof queryData] });
      }

      setQueryParts(tempQueryParts);
    } else {
      setQueryParts([]);
    }

    if (!!compareUrl && compareUrl.length > 0 && isValidUrl(compareUrl)) {
      const queryData = splitQueryString(compareUrl);

      let tempQueryParts = [];

      for (const item in queryData) {
        tempQueryParts.push({ key: item, value: queryData[item as keyof typeof queryData] });
      }

      setCompareQueryParts(tempQueryParts);
    } else {
      setCompareQueryParts([]);
    }
  }, [compareUrl, url]);

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="URL Diff"
        subtitle="Compare two URLs and their parameters."
        url={fullURL}
      />
      <div className="sticky top-0 bg-white">
        <UrlInput
          className={{
            "border border-red-500": !!url && url.length > 0 && !isValidUrl(url),
            "mb-4": true,
          }}
          label="URL"
          name="url"
          placeholder="Copy-paste your URL here"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url || ""}
        />

        <UrlInput
          className={{
            "border border-red-500":
              !!compareUrl && compareUrl.length > 0 && !isValidUrl(compareUrl),
            "mb-4": true,
          }}
          label="Compare URL"
          name="compare-url"
          placeholder="Copy-paste your other URL here"
          onChange={(e) => {
            setCompareUrl(e.target.value);
          }}
          value={compareUrl || ""}
        />
      </div>

      <DiffList
        className="mt-6"
        diffs={createDiffMap(queryParts, compareQueryParts)}
        heading="Query String Diffs"
      />
    </section>
  );
};

export default QueryStringDiffPage;
