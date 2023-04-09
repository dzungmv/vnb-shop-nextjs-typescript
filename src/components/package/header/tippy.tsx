'use client';

import LoadingCard from '@/components/common/loading-card';
import {
    setChangePasswordModal,
    setVerifyModal,
} from '@/components/redux/modal/modalSlice';
import { logout } from '@/components/redux/user/userSlice';
import { UserTypes } from '@/components/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type TippyCompProps = {
    tipRef: any;
};

const TippyComp: React.FC<TippyCompProps> = ({ tipRef }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isPending, setIsPending] = useState<boolean>(false);
    const [isPendingVerify, setIsPendingVerify] = useState<boolean>(false);

    const user = useSelector((state: any) => state.user.user as UserTypes);

    const HANDLE = {
        openVerifyModal: () => {
            dispatch(setVerifyModal(true));
            tipRef?.current?._tippy?.hide();
        },
        gotoOrderPage: () => {
            router.push('/order');
            tipRef?.current?._tippy?.hide();
        },
        openChangePasswordModal: () => {
            dispatch(setChangePasswordModal(true));
            tipRef?.current?._tippy?.hide();
        },
        logout: async () => {
            try {
                setIsPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/auth/logout`,
                    {},
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                setIsPending(false);
                await dispatch(logout());
                tipRef?.current?._tippy?.hide();
            } catch (error: any) {
                setIsPending(false);
                if (error?.response?.status === 401) {
                    dispatch(logout());
                }
                console.error(error);
            }
        },
    };

    return (
        <>
            <section className='w-[300px] py-3 px-1'>
                {!user?.user?.verified && (
                    <div
                        className='flex items-center justify-between gap-2 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 hover:cursor-pointer mb-2 py-3'
                        onClick={HANDLE.openVerifyModal}>
                        <span className='text-sm font-medium'>
                            User is not verify, verify now!
                        </span>

                        <div className=' w-2 h-2 rounded-full flex items-center justify-center bg-colorPrimary'></div>
                    </div>
                )}

                <div
                    className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer mb-1'
                    onClick={HANDLE.gotoOrderPage}>
                    <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-200'>
                        <i className='fa-sharp fa-regular fa-bags-shopping'></i>
                    </div>
                    <span className=' text-sm font-medium'>Ordered</span>
                </div>

                <div
                    className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer mb-3'
                    onClick={HANDLE.openChangePasswordModal}>
                    <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-200'>
                        <i className='fa-sharp fa-solid fa-key'></i>
                    </div>
                    <span className=' text-sm font-medium'>
                        Change password
                    </span>
                </div>

                <hr />

                <div
                    className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer mt-1'
                    onClick={HANDLE.logout}>
                    <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-200'>
                        <i className='fa-solid fa-right-from-bracket'></i>
                    </div>
                    <span className=' text-sm font-medium'>Logout</span>
                </div>

                {isPending && (
                    <div className='mt-2'>
                        <LoadingCard
                            width='35'
                            height='35'
                            content='Logout in processing...'
                        />
                    </div>
                )}
            </section>
        </>
    );
};

TippyComp.displayName = 'Tippy';
export default TippyComp;
