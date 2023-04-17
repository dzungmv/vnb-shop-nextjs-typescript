import ShirtProductsPage from '@/components/package/product/shirt-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Shirt',
};

export default function Page() {
    return (
        <>
            <ShirtProductsPage />
        </>
    );
}
