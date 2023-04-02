'use client';

import Tippy from '@tippyjs/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Modal from '@/components/common/modal';
import {
    setChangePasswordModal,
    setVerifyModal,
} from '@/components/redux/modal/modalSlice';
import { UserTypes } from '@/components/types';
import SearchComp from './search';
import TippyComp from './tippy';
import VefifyModal from './verify-modal';
import ChangePasswordModal from './change-password-modal';

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
    const pathname = usePathname();

    const dispatch = useDispatch();

    const tippyRef = useRef(null);

    const user = useSelector((state: any) => state.user.user as UserTypes);
    const verifyModal = useSelector((state: any) => state.modal.verify);
    const changePasswordModal = useSelector(
        (state: any) => state.modal.changePassword
    );

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

    return (
        <>
            <header className='bg-white w-ful h-[50px] shadow-md sticky top-0 left-0 right-0 z-[1000]'>
                <div className='max-w-[1260px] h-full mx-auto flex items-center justify-between relative'>
                    <div className='flex items-center gap-6 h-full'>
                        <Link href='/'>
                            <figure className=' w-[50px] h-full laptop:pl-4 tablet:pl-4'>
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
                            className='w-[300px] laptop:w-56 border rounded-full flex items-center px-3 gap-2 justify-center cursor-pointer tablet:w-10 tablet:h-10 hover:cursor-text'
                            onClick={() => setSearchContainer(true)}>
                            <i className='fa-regular fa-magnifying-glass text-gray-500 '></i>
                            <div className='w-full py-2 text-sm text-gray-500 tablet:hidden'>
                                Search products...
                            </div>
                        </div>

                        {searchContainer && (
                            <div className='search-mobile z-[1001] w-[40%] h-full bg-white absolute l-0 animate-fadeInLeft flex items-center tablet:w-full  '>
                                <SearchComp
                                    changeState={() =>
                                        setSearchContainer(false)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className=' flex-1 flex items-center justify-end gap-4 h-full mobile:gap-1 tablet:pr-4 laptop:pr-4'>
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

                        {user?.tokens?.accessToken ? (
                            <>
                                <div className='group w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer bg-slate-200 transition-all ease-in duration-[0.3s]'>
                                    <i className='fa-solid fa-cart-shopping group-hover:text-colorPrimary'></i>
                                </div>
                                <Tippy
                                    ref={tippyRef}
                                    content={<TippyComp tipRef={tippyRef} />}
                                    placement='bottom'
                                    arrow={false}
                                    theme='light'
                                    interactive>
                                    <div className='group w-[40px] h-[40px] rounded-full flex items-center justify-center hover:cursor-pointer bg-slate-200 relative'>
                                        <i className='fa-solid fa-user hover:text-colorPrimary'></i>
                                        {user?.user?.verified ? (
                                            <div className=' absolute bottom-0 right-[-3px] w-4 h-4 flex items-center justify-center rounded-full bg-green-500'>
                                                <i className='fa-solid fa-check text-white text-xs'></i>
                                            </div>
                                        ) : (
                                            <div className=' absolute top-0 right-[-3px] w-4 h-4 flex items-center justify-center rounded-full bg-colorPrimary'>
                                                <span className='text-xs text-white'>
                                                    1
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Tippy>

                                <div>
                                    <p>{user.user.name}</p>
                                </div>
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
                            {user?.tokens?.accessToken ? (
                                <>
                                    <p>
                                        Hello,{' '}
                                        <strong className=' text-colorPrimary'>
                                            {user?.user?.name}
                                        </strong>{' '}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className='flex gap-3'>
                                        <Link
                                            href={'/auth'}
                                            className='py-2 px-4 border border-colorPrimary bg-colorPrimary rounded-lg text-sm text-white font-medium hover:bg-colorPrimaryHover'>
                                            Sign in
                                        </Link>
                                        <Link
                                            href={'/auth'}
                                            className='py-2 px-4 border border-colorPrimary rounded-lg text-sm text-colorPrimary font-medium hover:bg-colorPrimary hover:text-white'>
                                            Sign up
                                        </Link>
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

            {verifyModal && (
                <Modal
                    title='Verify account'
                    open={verifyModal}
                    closeOutside
                    close={() => dispatch(setVerifyModal(false))}>
                    <VefifyModal />
                </Modal>
            )}

            {changePasswordModal && (
                <Modal
                    title='Change password'
                    open={changePasswordModal}
                    closeOutside={false}
                    close={() => dispatch(setChangePasswordModal(false))}>
                    <ChangePasswordModal />
                </Modal>
            )}
        </>
    );
};

Header.displayName = 'Header';

export default Header;
