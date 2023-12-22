import { Metadata } from 'next';
import QueryStringSplitPage from '@/components/pages/QueryStringSplit';

export const metadata: Metadata = {
    title: 'Query String Split'
};

const Page = () => {
    return (
        <div className="w-full">
            <QueryStringSplitPage />
        </div>
    );
}

export default Page;