import type { Metadata } from 'next';
import ShippingPage from '@/components/package/order/shipping-page';

export const metadata: Metadata = {
    title: 'Pending',
};

export default function Page() {
    return <ShippingPage />;
}
