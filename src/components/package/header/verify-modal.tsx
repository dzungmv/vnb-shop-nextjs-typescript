'use client';

import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingCard from '@/components/common/loading-card';
import { setVerifyModal } from '@/components/redux/modal/modalSlice';
import { UserTypes } from '@/components/types';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const VefifyModal: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user as UserTypes);

    const [isPendingSendOTP, setIsPendingSendOTP] = useState<boolean>(false);

    const sendOTP = async () => {
        try {
            setIsPendingSendOTP(true);
            await axios.post(
                `${process.env.SERVER_URL}/auth/send-otp`,
                {
                    email: user?.user?.email,
                },
                {
                    headers: {
                        authorization: user?.tokens?.accessToken,
                        'x-client-id': user?.user?._id,
                    },
                }
            );

            setIsPendingSendOTP(false);
            dispatch(setVerifyModal(false));
            router.push('/verify-account');
        } catch (error) {
            toast.error('Something went wrong!');
            setIsPendingSendOTP(false);
        }
    };
    return (
        <>
            <div className='w-[500px] p-4 mobile:w-full'>
                <p className=' text-sm'>
                    Please verify your account to continue using our service. We
                    have sent a verification email to your email address.
                </p>

                <div className='mt-5 flex items-center justify-end gap-2'>
                    {isPendingSendOTP && (
                        <LoadingCard
                            width='25'
                            height='25'
                            content='Verify in processing...'
                        />
                    )}
                    <div
                        className='font-medium text-sm text-colorPrimary hover:cursor-pointer hover:underline'
                        onClick={() => dispatch(setVerifyModal(false))}>
                        Not now
                    </div>
                    <button
                        className='py-2 px-5 font-medium text-sm bg-colorPrimary rounded-md text-white hover:bg-colorPrimaryHover'
                        onClick={sendOTP}>
                        Verify
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default VefifyModal;
