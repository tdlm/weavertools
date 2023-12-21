export type DataItem = {
    key: string,
    value: string | undefined
}

type DataList = {
    data: DataItem[],
    heading?: string,
    subheading?: string,
}

export default function DataList({ data, heading, subheading }: DataList) {
    return (
        <div>
            <div className="px-4 sm:px-0">
                {heading && <h3 className="text-xl font-semibold leading-7 text-blue-900">{heading}</h3>}
                {subheading && <p className="mt-1 max-w-2xl text-base leading-6 text-blue-500">{subheading}</p>}
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    {data.map((item) => (
                        <div key={item.key} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">{item.key}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0 sm:col-span-2 break-all">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
