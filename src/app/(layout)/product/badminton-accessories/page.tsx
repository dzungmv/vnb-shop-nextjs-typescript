import AccessoriesProductsPage from '@/components/package/product/accessories-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Accessories',
};

export default function Page() {
    return (
        <>
            <AccessoriesProductsPage />
        </>
    );
}
