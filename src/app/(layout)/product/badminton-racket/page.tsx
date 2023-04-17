import RacketProductsPage from '@/components/package/product/racket-products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Racket',
};

export default function Page() {
    return (
        <>
            <RacketProductsPage />
        </>
    );
}
