import BagProductsPage from '@/components/package/product/bag-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Bag',
};

export default function Page() {
    return (
        <>
            <BagProductsPage />
        </>
    );
}
