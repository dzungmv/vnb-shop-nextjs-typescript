import PantProductsPage from '@/components/package/product/pant-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Pants',
};

export default function Page() {
    return (
        <>
            <PantProductsPage />
        </>
    );
}
