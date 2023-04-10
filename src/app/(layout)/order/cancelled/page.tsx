import type { Metadata } from 'next';

import CancelledPage from '@/components/package/order/cancelled-page';

export const metadata: Metadata = {
    title: 'Cancelled',
};

export default function Page() {
    return <CancelledPage />;
}
