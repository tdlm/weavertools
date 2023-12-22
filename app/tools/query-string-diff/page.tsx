import { Metadata } from 'next';
import QueryStringDiffPage from "@/components/pages/QueryStringDiff";

export const metadata: Metadata = {
    title: 'Query String Diff'
};

const Page = () => {
    return (
        <div className="w-full">
            <QueryStringDiffPage />
        </div>
    )
}

export default Page;