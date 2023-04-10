import PendingPage from '@/components/package/order/pending-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pending',
};

export default function Page() {
    return <PendingPage />;
}
