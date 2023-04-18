'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingCard from '@/components/common/loading-card';

const IdentifyPage: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleRequest = async () => {
        if (email.length === 0) {
            setError('Email is required');
            return;
        }

        try {
            setIsPending(true);
            const res = await axios.post(
                `${process.env.SERVER_URL}/auth/forgot-password`,
                {
                    email,
                }
            );
            setIsPending(false);
            router.push(`/identify/${email}`);
        } catch (error) {
            setError('Email is not registered!');
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (email !== '') {
            setError('');
        }
    }, [email]);

    return (
        <section className='w-full h-[100vh] bg-[rgb(241_242_245)] flex items-center justify-center'>
            <header className='w-full h-12 shadow-sm fixed top-0 right-0 left-0 bg-white tablet:px-4'>
                <div className='max-w-[1200px] mx-auto flex items-center justify-between'>
                    <figure className='w-12 h-full'>
                        <Image
                            className='w-full h-full object-cover'
                            src={'/icon.png'}
                            alt='logo'
                            width='0'
                            height='0'
                            sizes='100vw'
                        />
                    </figure>

                    <div className='flex items-center gap-2'>
                        <Link
                            className='font-medium text-colorPrimary hover:underline'
                            href={'/auth'}>
                            Sign up
                        </Link>
                        <Link
                            className='text-sm py-2 px-4 bg-colorPrimary text-white font-medium rounded-lg hover:bg-colorPrimaryHover'
                            href={'/auth'}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </header>

            <div className='max-w-[1200px] bg-white p-3 rounded-lg shadow-md mobile:shadow-none mobile:rounded-none'>
                <h2 className='text-2xl font-medium mb-2'>
                    Reset your password!
                </h2>
                <hr />
                <p className='mt-3'>
                    Enter your email address and we&apos;ll send you OTP to
                    reset your password.
                </p>

                <input
                    type='email'
                    placeholder='Enter your email'
                    className='border py-3 pl-2 text-sm w-[70%] mt-6 rounded-lg mobile:w-full'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && (
                    <p className='text-sm font-medium text-colorPrimary ml-2'>
                        {error}
                    </p>
                )}

                <div className='flex items-center justify-end mt-6 gap-2'>
                    {isPending && (
                        <LoadingCard
                            width='22'
                            height='22'
                            content='Request in processing...'
                        />
                    )}

                    <Link
                        href={'/'}
                        className='px-5 py-2 rounded-md bg-slate-400 hover:bg-slate-500 text-sm font-medium text-white'>
                        Cancel
                    </Link>
                    <button
                        className='px-5 py-2 rounded-md bg-colorPrimary hover:bg-colorPrimaryHover text-sm font-medium text-white'
                        onClick={handleRequest}>
                        Request
                    </button>
                </div>
            </div>
        </section>
    );
};

IdentifyPage.displayName = 'IdentifyPage';
export default IdentifyPage;
