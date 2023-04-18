'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

import LoadingCard from '@/components/common/loading-card';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

type OtpTypes = {
    title: string;
    email: string;
};

const OtpResetPassword: React.FC<OtpTypes> = ({ title, email }) => {
    const router = useRouter();

    const emailFormatted = email.replace(/\%40/g, '@');

    const [otp, setOtp] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [isPendingResend, setIsPendingResend] = useState<boolean>(false);
    const [isPendingVerify, setIsPendingVerify] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [countDown, setCountDown] = useState<number>(60);

    const HANDLE = {
        resendOTP: async () => {
            try {
                setIsPendingResend(true);

                await axios.post(
                    `${process.env.SERVER_URL}/auth/forgot-password`,
                    {
                        email: emailFormatted,
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
                swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'User not found!',
                });
                setDisabled(false);
            }
        },

        verifyOTP: async () => {
            if (otp.length < 6)
                return swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'OTP must be 6 digits',
                });

            if (password.length < 6) {
                return swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'Password must be at least 6 characters',
                });
            }

            if (password !== confirmPassword) {
                return swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'Password not match!',
                });
            }

            try {
                setIsPendingVerify(true);

                await axios.post(
                    `${process.env.SERVER_URL}/auth/reset-password`,
                    {
                        email: emailFormatted,
                        otp,
                        password,
                    }
                );
                setIsPendingVerify(false);
                router.push('/auth');
            } catch (error) {
                console.error(error);
                swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'OTP not valid!',
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

    return (
        <>
            <section className='w-full h-[80vh] flex items-center justify-center mobile:px-4'>
                <div className='max-w-[720px] w-full h-[70%]'>
                    <h3 className='text-2xl font-medium'>{title}</h3>
                    <p className='mt-3'>
                        We just sent OTP to your email{' '}
                        <span className='text-colorPrimary font-medium'>
                            {emailFormatted}
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

                    <div className='w-[80%] mobile:w-full mx-auto mt-7'>
                        <input
                            type='password'
                            placeholder='New password'
                            className='px-2 py-3 w-full border rounded-md text-sm'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type='password'
                            placeholder='New password'
                            className='px-2 py-3 w-full border rounded-md text-sm mt-3'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <p className='text-center mt-8 text-sm '>
                        Didn&apos;t receive OTP?{' '}
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

OtpResetPassword.displayName = 'OtpComp';

export default OtpResetPassword;
