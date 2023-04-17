import ShoesProductsPage from '@/components/package/product/shoes-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Shoes',
};

export default function Page() {
    return (
        <>
            <ShoesProductsPage />
        </>
    );
}
