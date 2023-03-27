'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'tippy.js/dist/tippy.css';
import { usePathname } from 'next/navigation';

const navs = [
    {
        id: 1,
        name: 'Home',
        href: '/',
    },
    {
        id: 2,
        name: 'Products',
        icon: {
            chevronUp: 'fa-solid fa-chevron-up',
            chevronDown: 'fa-solid fa-chevron-down',
        },
        subnavs: [
            {
                name: 'Badminton Racket',
                items: [
                    {
                        name: 'Yonex Racket',
                        href: '#',
                    },
                    {
                        name: 'Victor Racket',
                        href: '#',
                    },
                    {
                        name: 'Lining Racket',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Racket',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Shoes',
                items: [
                    {
                        name: 'Yonex Shoes',
                        href: '#',
                    },
                    {
                        name: 'Victor Shoes',
                        href: '#',
                    },
                    {
                        name: 'Lining Shoes',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Shoes',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Shirt',
                items: [
                    {
                        name: 'Yonex Shirt',
                        href: '#',
                    },
                    {
                        name: 'Victor Shirt',
                        href: '#',
                    },
                    {
                        name: 'Lining Shirt',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Shirt',
                        href: '#',
                    },
                ],
            },
            {
                name: 'Badminton Skirt',
                items: [
                    {
                        name: 'Yonex Skirt',
                        href: '#',
                    },
                    {
                        name: 'Victor Skirt',
                        href: '#',
                    },
                    {
                        name: 'Lining Skirt',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Skirt',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Pants',
                items: [
                    {
                        name: 'Yonex Paints',
                        href: '#',
                    },
                    {
                        name: 'Victor Paints',
                        href: '#',
                    },
                    {
                        name: 'Lining Paints',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Paints',
                        href: '#',
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: 'Sale off',
        href: 'sale-off',
    },
    {
        id: 4,
        name: 'Badminton News',
        href: 'badminton-news',
    },
];

const Header = () => {
    const isLogin: boolean = false;
    const pathname = usePathname();

    return (
        <header className='bg-white  w-ful h-[50px] shadow-md sticky top-0 left-0 right-0 z-[1000]'>
            <div className='max-w-[1260px] h-full mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-6 h-full'>
                    <Link href='/'>
                        <figure className=' w-[50px] h-full'>
                            <Image
                                className='w-full h-full object-cover'
                                src={'/icon.png'}
                                alt='ShopVNB'
                                width='0'
                                height='0'
                                sizes='100vw'
                                priority
                            />
                        </figure>
                    </Link>
                    <nav className='flex h-full'>
                        {navs.map((nav) => {
                            return (
                                <Link
                                    key={nav.id}
                                    href={nav?.href || ''}
                                    className={
                                        pathname === nav.href
                                            ? 'flex items-center justify-center h-full px-5 hover font-medium text-colorPrimary border-b-2 border-colorPrimary'
                                            : 'flex items-center justify-center h-full px-5 hover font-medium hover:opacity-50'
                                    }>
                                    {nav?.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className=' flex-1 flex items-center justify-end gap-4 h-full'>
                    <div className='w-[300px] bg-bgGray rounded-[20px] flex items-center gap-2 px-3'>
                        <i className='fa-regular fa-magnifying-glass text-gray-500 '></i>
                        <input
                            className=' bg-transparent py-px10 w-full text-sm  placeholder:text-gray-500'
                            type='text'
                            placeholder='Search product...'
                        />
                    </div>

                    {isLogin ? (
                        <>
                            <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                <i className='fa-solid fa-user text-colorPrimary group-hover:text-white'></i>
                            </div>

                            <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                <i className='fa-solid fa-cart-shopping text-colorPrimary group-hover:text-white'></i>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex gap-3'>
                                <button className='text-sm text-colorPrimary font-medium hover:text-colorPrimaryHover'>
                                    Sign in
                                </button>
                                <button className='py-2 px-4 border border-colorPrimary rounded-lg text-sm text-colorPrimary font-medium hover:bg-colorPrimary hover:text-white'>
                                    Sign up
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.displayName = 'Header';

export default Header;
