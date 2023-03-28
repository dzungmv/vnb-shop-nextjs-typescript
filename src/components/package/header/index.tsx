'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'tippy.js/dist/tippy.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <>
            <header className='bg-white w-ful h-[50px] shadow-md sticky top-0 left-0 right-0 z-[1000] tablet:px-4'>
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
                        <nav className='flex h-full tablet:hidden'>
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
                                <>
                                    <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                        <i className='fa-solid fa-user text-colorPrimary group-hover:text-white'></i>
                                    </div>

                                    <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                        <i className='fa-solid fa-cart-shopping text-colorPrimary group-hover:text-white'></i>
                                    </div>
                                </>
                            </>
                        ) : (
                            <>
                                <div className='flex gap-3 tablet:hidden'>
                                    <button className='text-sm text-colorPrimary font-medium hover:text-colorPrimaryHover'>
                                        Sign in
                                    </button>
                                    <button className='py-2 px-4 border border-colorPrimary rounded-lg text-sm text-colorPrimary font-medium hover:bg-colorPrimary hover:text-white'>
                                        Sign up
                                    </button>
                                </div>
                            </>
                        )}

                        <div
                            className='group hover:cursor-pointer hidden tablet:block'
                            onClick={() => setIsShow((prev) => !prev)}>
                            <i className='fa-solid fa-bars text-xl group-hover:text-colorPrimary'></i>
                        </div>
                    </div>
                </div>
            </header>

            {isShow && (
                <section className='w-full h-[100vh] bg-white animate-fadeInLeft z-[1001] fixed top-0 left-0 transition-all duration-500 p-3'>
                    <header className='flex items-center justify-between'>
                        {' '}
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
                        <div
                            className=' w-9 h-9 flex items-center justify-center rounded-full border hover:cursor-pointer hover:bg-slate-200'
                            onClick={() => setIsShow(false)}>
                            <i className='fa-solid fa-xmark text-xl text-gray-600'></i>
                        </div>
                    </header>

                    <div className=' mt-3'>
                        <div>
                            {isLogin ? (
                                <>
                                    <>
                                        <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                            <i className='fa-solid fa-user text-colorPrimary group-hover:text-white'></i>
                                        </div>

                                        <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                            <i className='fa-solid fa-cart-shopping text-colorPrimary group-hover:text-white'></i>
                                        </div>
                                    </>
                                </>
                            ) : (
                                <>
                                    <div className='flex gap-3'>
                                        <button className='py-2 px-4 border border-colorPrimary bg-colorPrimary rounded-lg text-sm text-white font-medium hover:bg-colorPrimaryHover'>
                                            Sign in
                                        </button>
                                        <button className='py-2 px-4 border border-colorPrimary rounded-lg text-sm text-colorPrimary font-medium hover:bg-colorPrimary hover:text-white'>
                                            Sign up
                                        </button>
                                    </div>
                                </>
                            )}

                            <nav className='mt-4 flex flex-col gap-3'>
                                {navs.map((nav: any) => {
                                    return (
                                        <Link
                                            key={nav.id}
                                            href={nav?.href || ''}
                                            className={
                                                pathname === nav.href
                                                    ? 'flex items-center hover font-medium text-lg text-colorPrimary border-b-2 border-colorPrimary'
                                                    : 'flex items-center hover font-medium text-lg hover:opacity-50'
                                            }>
                                            {nav?.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

Header.displayName = 'Header';

export default Header;
