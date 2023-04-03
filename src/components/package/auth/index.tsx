'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingCard from '@/components/common/loading-card';
import { setUser } from '@/components/redux/user/userSlice';
import { UserTypes } from '@/components/types';
import { redirect } from 'next/navigation';
import RegisterForm from './register';

const LoginComp: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user as UserTypes);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [changeForm, setChangeForm] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const HANDLE = {
        login: async () => {
            if (email.length === 0) {
                setEmailError('Email is required');
                return;
            }

            if (password.length === 0) {
                setPasswordError('Password is required');
                return;
            }

            try {
                setIsPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/auth/login`,
                    {
                        email,
                        password,
                    }
                );
                await dispatch(setUser(res?.data?.metadata));
                setIsPending(false);
            } catch (error: any) {
                setIsPending(false);

                if (error?.response?.data?.message?.includes('User')) {
                    setEmailError(error.response.data.message);
                }
                if (error?.response?.data?.message?.includes('Password')) {
                    setPasswordError(error.response.data.message);
                }
            }
        },
    };

    useEffect(() => {
        if (email !== '') {
            setEmailError('');
        }

        if (password !== '') {
            setPasswordError('');
        }
    }, [email, password]);

    useEffect(() => {
        if (user?.tokens?.accessToken) {
            redirect('/');
        }
    }, [user]);

    return (
        <>
            <main className='flex items-center justify-center h-[85vh] w-full mobile:px-4'>
                <section className='flex w-[75%] h-[75%] items-center laptop:w-full  mobile:w-full'>
                    <figure className='w-[64%] laptop:w-[50%] h-full tablet:hidden'>
                        <Image
                            className=' w-full h-full object-cover'
                            src={'/badminton.webp'}
                            alt='badminton'
                            width='0'
                            height='0'
                            sizes='100vw'
                        />
                    </figure>
                    {changeForm ? (
                        <RegisterForm
                            handleChangeForm={() => setChangeForm(false)}
                        />
                    ) : (
                        <section className='w-[38%] tablet:w-full flex flex-col gap-3 border rounded-lg shadow-xl p-4 animate-fadeInLeft'>
                            <figure className='hidden  tablet:flex items-center justify-center '>
                                <Image
                                    className='w-12 h-12 object-cover'
                                    src={'/icon.png'}
                                    alt='logo'
                                    width='0'
                                    height='0'
                                    sizes='100vw'
                                />
                            </figure>

                            {isPending && (
                                <LoadingCard
                                    width='35'
                                    height='35'
                                    content='Login in processing...'
                                />
                            )}

                            <div className=' border rounded-lg px-3'>
                                <input
                                    className=' py-3 bg-transparent w-full text-sm'
                                    type='text'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {emailError && (
                                <div className=''>
                                    <p className='text-red-500 text-xs ml-1 mt-[-10px]'>
                                        {emailError}
                                    </p>
                                </div>
                            )}

                            <div className=' border rounded-lg px-3'>
                                <input
                                    className=' py-3 bg-transparent w-full text-sm'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            {passwordError && (
                                <div className=''>
                                    <p className='text-red-500 text-xs ml-1 mt-[-10px]'>
                                        {passwordError}
                                    </p>
                                </div>
                            )}

                            <button
                                className='py-2 text-white font-medium rounded-lg bg-colorPrimary text-lg hover:bg-colorPrimaryHover mb-1'
                                onClick={HANDLE.login}>
                                Login
                            </button>

                            <Link
                                href='/identify'
                                className=' text-center text-colorPrimary font-medium text-sm hover:underline'>
                                Forgot password?
                            </Link>

                            <hr />

                            <div
                                className='border border-[#1bb11b] w-[50%] mx-auto py-3 px-3 mt-4 rounded-lg font-medium text-sm flex items-center justify-center text-[#1bb11b] hover:bg-[#1bb11b] hover:text-white hover:cursor-pointer transition-all duration-500'
                                onClick={() => setChangeForm(true)}>
                                Create a new account
                            </div>
                        </section>
                    )}
                </section>
            </main>
        </>
    );
};

LoginComp.displayName = 'LoginComp';
export default LoginComp;
