import type { Metadata } from 'next';
import CompletedPage from '@/components/package/order/completed-page';

export const metadata: Metadata = {
    title: 'Completed',
};

export default function Page() {
    return <CompletedPage />;
}
