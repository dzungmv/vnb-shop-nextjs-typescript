'use client';

import { UserTypes } from '@/components/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';

import LoadingCard from '@/components/common/loading-card';
import { setVerified } from '@/components/redux/user/userSlice';
import { redirect, useRouter } from 'next/navigation';
import swal from 'sweetalert';

type OtpTypes = {
    title: string;
};

const OtpComp: React.FC<OtpTypes> = ({ title }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state: any) => state.user.user as UserTypes);

    const [otp, setOtp] = useState<string>('');

    const [isPendingResend, setIsPendingResend] = useState<boolean>(false);
    const [isPendingVerify, setIsPendingVerify] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [countDown, setCountDown] = useState<number>(60);

    const HANDLE = {
        resendOTP: async () => {
            try {
                setIsPendingResend(true);

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
                setDisabled(true);
                setIsPendingResend(false);
                swal({
                    title: 'Success',
                    icon: 'success',
                    text: 'OTP has been sent to your email!',
                });
            } catch (error: any) {
                setIsPendingResend(false);
                setDisabled(false);
            }
        },

        verifyOTP: async () => {
            if (otp.length < 6)
                return swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'OTP must be 6 digits!',
                });

            try {
                setIsPendingVerify(true);

                await axios.post(
                    `${process.env.SERVER_URL}/auth/verify-account`,
                    {
                        otp,
                        email: user?.user?.email,
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );
                await dispatch(setVerified(true));
                setIsPendingVerify(false);
                swal({
                    title: 'Success',
                    icon: 'success',
                    text: 'Your account has been verified1',
                }).then(() => {
                    router.push('/');
                });
            } catch (error) {
                swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'OTP is incorrect!',
                });
                setIsPendingVerify(false);
            }
        },
    };

    useEffect(() => {
        if (disabled) {
            const interval = setInterval(() => {
                setDisabled(false);
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [disabled]);

    const onChange = (otp: string) => {
        setOtp(otp);
    };

    useEffect(() => {
        if (disabled) {
            const interval = setInterval(() => {
                setCountDown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCountDown(60);
        }
    }, [disabled]);

    useEffect(() => {
        if (!user.user) {
            redirect('/');
        }
    }, [user?.user]);

    return (
        <>
            <section className='w-full h-[80vh] flex items-center justify-center mobile:px-4'>
                <div className='max-w-[720px] w-full h-[70%]'>
                    <h3 className='text-2xl font-medium'>{title}</h3>
                    <p className='mt-3'>
                        We just sent OTP to your email{' '}
                        <span className=' text-colorPrimary font-medium'>
                            {user?.user?.email}
                        </span>
                    </p>

                    <div className='w-[80%] mobile:w-full mx-auto mt-[100px]'>
                        <OtpInput
                            value={otp}
                            onChange={onChange}
                            numInputs={6}
                            renderSeparator={
                                <span className='mx-2 mobile:mx-0'>-</span>
                            }
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    type='number'
                                    className='!w-full border py-2 rounded-md'
                                />
                            )}
                        />
                    </div>

                    <p className='text-center mt-8 text-sm '>
                        Didn't receive OTP?{' '}
                        {disabled ? (
                            <span className='font-medium text-colorPrimary'>
                                {countDown}
                            </span>
                        ) : (
                            <button
                                className='font-medium text-sm text-center hover:cursor-pointer text-colorPrimary hover:underline disabled:text-gray-400'
                                onClick={HANDLE.resendOTP}
                                disabled={
                                    isPendingResend ||
                                    isPendingVerify ||
                                    disabled
                                }>
                                Resend
                            </button>
                        )}
                    </p>

                    {isPendingResend && (
                        <div className='w-[60%] mobile:w-full mx-auto my-2'>
                            <LoadingCard
                                width='35'
                                height='35'
                                content='Resend OTP in processing...'
                            />
                        </div>
                    )}

                    {isPendingVerify && (
                        <div className='w-[60%] mobile:w-full mx-auto my-2'>
                            <LoadingCard
                                width='35'
                                height='35'
                                content='Verify OTP in processing...'
                            />
                        </div>
                    )}

                    <div
                        className='flex items-center justify-center mt-3'
                        onClick={HANDLE.verifyOTP}>
                        <button
                            className='py-2 px-4 text-sm font-medium flex items-center justify-center border border-colorPrimary rounded-md text-colorPrimary hover:bg-colorPrimary hover:text-white disabled:bg-slate-200 disabled:border-gray-300 disabled:text-gray-500'
                            disabled={isPendingResend || isPendingVerify}>
                            Confirm
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

OtpComp.displayName = 'OtpComp';

export default OtpComp;
