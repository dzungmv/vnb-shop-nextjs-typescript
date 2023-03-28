import RacketComp from '@/components/package/product/racket';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badminton Racket',
};

export default function Page() {
    return (
        <>
            <RacketComp />
        </>
    );
}
