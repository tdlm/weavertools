"use client";

import { DataDiffItem } from "@/lib/create-diff-map";
import { cn } from "@/lib/utils";
import { DataItem } from "./data-list";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import NoticeEmptyStateDashedWithIcon from "./notice-empty-state-dashed-with-icon";

export type DiffItem = {
  key: string;
  value1: string | undefined;
  value2: string | undefined;
};

type DiffListProps = {
  className?: string | Object;
  diffs: {
    commonDiff: DataDiffItem[];
    exclusiveToFirst: DataItem[];
    exclusiveToSecond: DataItem[];
  };
  heading?: string;
  subheading?: string;
};

export default function DiffList({ className = "", diffs, heading, subheading }: DiffListProps) {
  const { commonDiff, exclusiveToFirst, exclusiveToSecond } = diffs;

  if (!commonDiff.length && !exclusiveToFirst.length && !exclusiveToSecond.length) {
    return (
      <NoticeEmptyStateDashedWithIcon
        className="mt-6 text-sm font-medium text-gray-500"
        icon={
          <DocumentDuplicateIcon
            className="mx-auto h-12 w-12 text-gray-400"
            height={48}
            width={48}
          />
        }
      >
        There are currently no URL differences.
      </NoticeEmptyStateDashedWithIcon>
    );
  }

  return (
    <div className={cn(className)}>
      <div className="px-4 sm:px-0">
        {heading && <h3 className="text-xl font-semibold leading-7 text-blue-900">{heading}</h3>}
        {subheading && (
          <p className="mt-1 max-w-2xl text-base leading-6 text-blue-500">{subheading}</p>
        )}
      </div>
      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {/* Render common differences */}
          {commonDiff.map((diff, index) => (
            <div
              key={`common-${index}`}
              className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-900">{diff.key}</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <div className="text-red-500 break-all">- {diff.value1}</div>
                <div className="text-green-500 break-all">+ {diff.value2}</div>
              </dd>
            </div>
          ))}

          {/* Render items exclusive to the first array */}
          {exclusiveToFirst.map((item, index) => (
            <div
              key={`ex-first-${index}`}
              className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-900">{item.key}</dt>
              <dd className="mt-1 text-sm text-red-500 sm:mt-0 sm:col-span-2 break-all">
                - {item?.value}
              </dd>
            </div>
          ))}

          {/* Render items exclusive to the second array */}
          {exclusiveToSecond.map((item, index) => (
            <div
              key={`ex-second-${index}`}
              className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-900">{item.key}</dt>
              <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2 break-all">
                + {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
