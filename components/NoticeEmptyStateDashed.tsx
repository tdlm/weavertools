import { cn } from "@/lib/utils";
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

type NoticeEmptyStateDashedProps = {
    className?: string | Object,
    children: React.ReactNode,
}

export default function NoticeEmptyStateDashed({ className, children }: NoticeEmptyStateDashedProps) {
    return (
        <div
            className={cn("relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", className)}
        >
            <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-400" height={48} width={48} />
            <span className="mt-2 block text-sm font-normal text-gray-400">{children}</span>
        </div>
    )
}
