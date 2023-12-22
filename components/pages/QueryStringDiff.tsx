"use client";

import { useEffect, useState } from "react";
import { useQueryState } from 'next-usequerystate';
import { DataItem } from "@/components/DataList";
import DiffList from '@/components/DiffList';
import UrlInput from "@/components/UrlInput";
import createDiffMap from '@/lib/createDiffMap';
import isValidUrl from "@/lib/isValidUrl";
import splitQueryString from "@/lib/splitQueryString";

const QueryStringDiffPage = () => {
    const [url, setUrl] = useQueryState('url', {
        parse: (value) => atob(decodeURIComponent(value)),
        serialize: (value) => encodeURIComponent(btoa(value))
    });

    const [compareUrl, setCompareUrl] = useQueryState('compare-url', {
        parse: (value) => atob(decodeURIComponent(value)),
        serialize: (value) => encodeURIComponent(btoa(value))
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
            <UrlInput
                className={{
                    "border border-red-500": !!url && url.length > 0 && !isValidUrl(url)
                }}
                label="URL"
                name="url"
                placeholder="Copy-paste your URL here"
                onChange={(e) => { setUrl(e.target.value) }}
                value={url || ""}
            />

            <UrlInput
                className={{
                    "border border-red-500": !!compareUrl && compareUrl.length > 0 && !isValidUrl(compareUrl)
                }}
                label="Compare URL"
                name="compare-url"
                placeholder="Copy-paste your other URL here"
                onChange={(e) => { setCompareUrl(e.target.value) }}
                value={compareUrl || ""}
            />

            <DiffList
                className="mt-6"
                diffs={createDiffMap(queryParts, compareQueryParts)}
                heading="Query String Diffs"
            />
        </section>
    )
}

export default QueryStringDiffPage;