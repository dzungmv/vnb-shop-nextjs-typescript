import SkirtProductsPage from '@/components/package/product/skirt-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Skirt',
};

export default function Page() {
    return (
        <>
            <SkirtProductsPage />
        </>
    );
}
