import OrderNavBar from '@/components/package/order/nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Orders',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='max-w-[980px] mx-auto mt-8'>
            <header className='bg-white rounded-md mb-5 sticky top-12'>
                <h1 className=' text-2xl font-semibold'>Your ordered</h1>
                <OrderNavBar />
            </header>
            {children}
        </main>
    );
}
