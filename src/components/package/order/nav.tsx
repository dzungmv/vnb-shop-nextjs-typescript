'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavProps = {
    name: string;
    path: string;
};

const NAVS = [
    {
        name: 'All orders',
        path: '/order',
    },
    {
        name: 'Pending',
        path: '/order/pending',
    },
    {
        name: 'Shipping',
        path: '/order/shipping',
    },
    {
        name: 'Completed',
        path: '/order/completed',
    },
    {
        name: 'Cancelled',
        path: '/order/cancelled',
    },
];
const OrderNavBar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className='mt-3 flex items-center flex-wrap justify-center mobile:'>
            {NAVS.map((nav: NavProps, index: number) => {
                return (
                    <Link
                        key={index}
                        href={nav.path}
                        passHref
                        className={
                            pathname === nav.path
                                ? 'border-b-[3px] border-b-colorPrimary'
                                : ''
                        }>
                        <div
                            className={
                                pathname === nav.path
                                    ? 'px-4 py-3 rounded-md hover:cursor-pointer hover:bg-slate-100 font-medium text-colorPrimary'
                                    : 'px-4 py-3 rounded-md hover:cursor-pointer hover:bg-slate-100 font-medium'
                            }>
                            {nav.name}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
};

OrderNavBar.displayName = 'OrderNavBar';
export default OrderNavBar;
