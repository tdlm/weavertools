"use client";

import { useQueryState } from 'next-usequerystate'
import DataList, { DataItem } from "@/components/DataList";
import UrlInput from "@/components/UrlInput";
import splitUrl from "@/lib/splitUrl";
import isValidUrl from "@/lib/isValidUrl";
import splitQueryString from "@/lib/splitQueryString";
import { useEffect, useState } from "react";

const QueryStringSplitPage = () => {
    const [url, setUrl] = useQueryState('url');
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
        <div>
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

            {0 < urlParts.length && <section className="mt-6">
                <DataList
                    heading="URL Parts"
                    data={urlParts}
                />
            </section>}

            {0 < queryParts.length && <section className="mt-6">
                <DataList
                    heading="Query String Parts"
                    data={queryParts}
                />
            </section>}
        </div>
    );
}

export default QueryStringSplitPage;