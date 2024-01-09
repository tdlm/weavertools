"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "next-usequerystate";
import DataList, { DataItem } from "@/components/data-list";
import isValidUrl from "@/lib/is-valid-url";
import splitQueryString from "@/lib/split-query-string";
import splitUrl from "@/lib/split-url";
import UrlInput from "@/components/url-input";
import TitleHeader from "../title-header";
import { LinkIcon } from "@heroicons/react/24/outline";
import NoticeEmptyStateDashedWithIcon from "@/components/notice-empty-state-dashed-with-icon";

const QueryStringSplitPage = () => {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const [url, setUrl] = useQueryState("url", {
    parse: (value) => atob(decodeURIComponent(value)),
    serialize: (value) => encodeURIComponent(btoa(value)),
  });
  const [urlParts, setUrlParts] = useState<DataItem[]>([]);
  const [queryParts, setQueryParts] = useState<DataItem[]>([]);

  useEffect(() => {
    if (!!url && url.length > 0 && isValidUrl(url)) {
      const data = splitUrl(url);

      let tempUrlParts = [];

      for (const item in data) {
        tempUrlParts.push({ key: item, value: data[item as keyof typeof data] });
      }

      setUrlParts(tempUrlParts);

      const queryData = splitQueryString(url);

      let tempQueryParts = [];

      for (const item in queryData) {
        tempQueryParts.push({ key: item, value: queryData[item as keyof typeof queryData] });
      }

      setQueryParts(tempQueryParts);
    } else {
      setUrlParts([]);
      setQueryParts([]);
    }
  }, [url]);

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader title="URL Split" subtitle="Split a URL into its parts" url={fullURL} />
      <div className="sticky top-0">
        <UrlInput
          className={{
            "border border-red-500": !!url && url.length > 0 && !isValidUrl(url),
            "bg-white mb-4": true,
          }}
          label="URL"
          name="url"
          placeholder="Copy-paste your URL here"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url || ""}
        />
      </div>

      {0 === urlParts.length && 0 === queryParts.length && (
        <NoticeEmptyStateDashedWithIcon
          className="mt-6 text-sm font-medium text-gray-500"
          icon={<LinkIcon className="mx-auto h-12 w-12 text-gray-400" height={48} width={48} />}
        >
          Please enter a valid URL.
        </NoticeEmptyStateDashedWithIcon>
      )}

      {0 < urlParts.length && <DataList heading="URL Parts" data={urlParts} />}

      {0 < queryParts.length && <DataList heading="Query String Parts" data={queryParts} />}
    </section>
  );
};

export default QueryStringSplitPage;
