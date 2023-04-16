import ProductsPage from '@/components/package/product/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
};

export default async function Page() {
    return (
        <>
            <ProductsPage />
        </>
    );
}
