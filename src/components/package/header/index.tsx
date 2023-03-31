'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'tippy.js/dist/tippy.css';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';

import SearchComp from './search';
import { UserTypes } from '@/components/types';
import TippyComp from './tippy';

const navs = [
    {
        id: 1,
        name: 'Home',
        href: '/',
    },
    {
        id: 2,
        name: 'Products',
        href: '/product',
    },
    {
        id: 3,
        name: 'Sale off',
        href: '',
    },
    {
        id: 4,
        name: 'Badminton News',
        href: '',
    },
];

const Header = () => {
    const isLogin: boolean = false;
    const pathname = usePathname();

    const tippyRef = useRef(null);

    const user = useSelector((state: any) => state.user.user as UserTypes);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [searchContainer, setSearchContainer] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (searchContainer && event.target.closest('.search-mobile')) {
                return;
            }
            setSearchContainer(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchContainer]);

    const handleCloseSearch = () => {
        setSearchContainer(false);
    };

    return (
        <>
            <header className='bg-white w-ful h-[50px] shadow-md sticky top-0 left-0 right-0 z-[1000] laptop:px-4 tablet:px-4'>
                <div className='max-w-[1260px] h-full mx-auto flex items-center justify-between relative'>
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

                        <div
                            className='w-[300px] border rounded-full flex items-center px-3 gap-2 justify-center cursor-pointer tablet:w-10 tablet:h-10'
                            onClick={() => setSearchContainer(true)}>
                            <i className='fa-regular fa-magnifying-glass text-gray-500 '></i>
                            <div className='w-full py-2 text-sm text-gray-500 tablet:hidden'>
                                Search products...
                            </div>
                        </div>

                        {searchContainer && (
                            <div className='search-mobile z-[1001] w-[40%] h-full bg-white absolute l-0 animate-fadeInLeft flex items-center tablet:w-full '>
                                <SearchComp
                                    changeState={() =>
                                        setSearchContainer(false)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className=' flex-1 flex items-center justify-end gap-4 h-full'>
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

                        {user.tokens.accessToken ? (
                            <>
                                <>
                                    <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                        <i className='fa-solid fa-cart-shopping text-colorPrimary group-hover:text-white'></i>
                                    </div>
                                    <Tippy
                                        ref={tippyRef}
                                        content={
                                            <TippyComp tipRef={tippyRef} />
                                        }
                                        placement='bottom'
                                        trigger='click'
                                        arrow={false}
                                        theme='light'
                                        interactive>
                                        <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                                            <i className='fa-solid fa-user text-colorPrimary group-hover:text-white'></i>
                                        </div>
                                    </Tippy>

                                    <div>
                                        <p>{user.user.name}</p>
                                    </div>
                                </>
                            </>
                        ) : (
                            <>
                                {pathname !== '/auth' && (
                                    <div className='flex gap-3 tablet:hidden items-center'>
                                        <Link
                                            href='/auth'
                                            className='text-colorPrimary font-medium hover:text-colorPrimaryHover'>
                                            Sign in
                                        </Link>
                                        <Link
                                            href='/auth'
                                            className='py-2 px-4 border border-colorPrimary rounded-lg text-sm text-colorPrimary font-medium hover:bg-colorPrimary hover:text-white'>
                                            Sign up
                                        </Link>
                                    </div>
                                )}
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
