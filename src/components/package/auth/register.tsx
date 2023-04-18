'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '@/components/redux/user/userSlice';

import LoadingCard from '@/components/common/loading-card';
import swal from 'sweetalert';

type Props = {
    handleChangeForm: (state: boolean) => void | undefined;
};

const RegisterForm: React.FC<Props> = ({ handleChangeForm }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');

    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [rePasswordError, setRePasswordError] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const HANDLE = {
        validateEmail: (email: string) => {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        register: async () => {
            if (name.length === 0) {
                setNameError('Name is required');
                return;
            }

            if (email.length === 0) {
                setEmailError('Email is required');
                return;
            }

            if (password.length === 0) {
                setPasswordError('Password is required');
                return;
            }

            if (rePassword.length === 0) {
                setRePasswordError('Re-enter password');
                return;
            }

            if (password !== rePassword) {
                setRePasswordError('Password not match');
                return;
            }

            if (!HANDLE.validateEmail(email)) {
                setEmailError('Invalid email');
                return;
            }

            try {
                setIsPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/auth/register`,
                    {
                        name,
                        email,
                        password,
                    }
                );
                setIsPending(false);
                await dispatch(setUser(res.data.metadata));
                swal({
                    title: 'Register success',
                    icon: 'success',
                });
            } catch (error: any) {
                setIsPending(false);
                if (error.response.data.message.includes('Email')) {
                    setEmailError(error.response.data.message);
                }
            }
        },
    };

    useEffect(() => {
        if (name !== '') {
            setNameError('');
        }

        if (email !== '') {
            setEmailError('');
        }

        if (password !== '') {
            setPasswordError('');
        }

        if (rePassword !== '') {
            setRePasswordError('');
        }
    }, [name, email, password, rePassword]);

    return (
        <>
            <section className='w-[38%] tablet:w-full flex flex-col gap-3 border rounded-lg shadow-xl p-4 animate-fadeInRight mobile:shadow-none mobile:border-none'>
                <figure className='hidden tablet:flex items-center justify-center'>
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
                        width='30'
                        height='30'
                        content='Register in processing...'
                    />
                )}
                <div className='border rounded-lg px-3'>
                    <input
                        className='py-3 bg-transparent w-full text-sm'
                        type='text'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {nameError && (
                    <div className=''>
                        <p className='text-red-500 text-xs ml-1 mt-[-10px]'>
                            {nameError}
                        </p>
                    </div>
                )}

                <div className='border rounded-lg px-3'>
                    <input
                        className='py-3 bg-transparent w-full text-sm'
                        type='text'
                        placeholder='Enter your email'
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

                <div className='border rounded-lg px-3'>
                    <input
                        className='py-3 bg-transparent w-full text-sm'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {passwordError && (
                    <div className=''>
                        <p className='text-red-500 text-xs ml-1 mt-[-10px]'>
                            {passwordError}
                        </p>
                    </div>
                )}

                <div className='border rounded-lg px-3'>
                    <input
                        className='py-3 bg-transparent w-full text-sm'
                        type='password'
                        placeholder='Re-enter password'
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                {rePasswordError && (
                    <div className=''>
                        <p className='text-red-500 text-xs ml-1 mt-[-10px]'>
                            {rePasswordError}
                        </p>
                    </div>
                )}

                <button
                    className='py-2 text-white font-medium rounded-lg bg-[#1bb11b] text-lg hover:bg-[#148814] mb-1'
                    onClick={HANDLE.register}>
                    Sign up
                </button>

                <hr />

                <div className='text-sm text-center'>
                    Already have an account?{' '}
                    <span
                        onClick={() => handleChangeForm(false)}
                        className='font-medium text-colorPrimary hover:cursor-pointer hover:underline'>
                        Login
                    </span>
                </div>
            </section>
        </>
    );
};

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
