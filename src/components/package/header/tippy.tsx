'use client';

import LoadingCard from '@/components/common/loading-card';
import { logout } from '@/components/redux/user/userSlice';
import { UserTypes } from '@/components/types';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

type TippyCompProps = {
    tipRef: any;
};

const TippyComp: React.FC<TippyCompProps> = ({ tipRef }) => {
    const dispatch = useDispatch();

    const [isPending, setIsPending] = useState<boolean>(false);

    const user = useSelector((state: any) => state.user.user as UserTypes);
    console.log(tipRef);
    console.log(user);

    const HANDLE = {
        logout: async () => {
            try {
                setIsPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/auth/logout`,
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user.id,
                        },
                    }
                );
                setIsPending(false);
                console.log(res);
                await dispatch(logout());
                toast.success('Logout successfully');
                tipRef?.current?._tippy?.hide();
            } catch (error: any) {
                setIsPending(false);
                console.error(error);
            }
        },
    };

    return (
        <>
            <section className='w-[300px] py-3 px-1'>
                <div className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer mb-3'>
                    <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-200'>
                        <i className='fa-sharp fa-regular fa-bags-shopping'></i>
                    </div>
                    <span className=' text-sm font-medium'>Ordered</span>
                </div>

                <hr />

                <div className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer mt-1'>
                    <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-200'>
                        <i className='fa-solid fa-right-from-bracket'></i>
                    </div>
                    <span
                        className=' text-sm font-medium'
                        onClick={HANDLE.logout}>
                        Logout
                    </span>
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
            <ToastContainer />
        </>
    );
};

TippyComp.displayName = 'Tippy';
export default TippyComp;
