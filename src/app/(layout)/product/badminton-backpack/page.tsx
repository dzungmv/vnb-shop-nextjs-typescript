import BaloProductsPage from '@/components/package/product/balo-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Backpack',
};

export default function Page() {
    return (
        <>
            <BaloProductsPage />
        </>
    );
}
