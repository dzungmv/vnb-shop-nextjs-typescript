'use client';

import OtpComp from '@/components/package/otp';
import { UserTypes } from '@/components/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user as UserTypes);

    useEffect(() => {
        if (user?.user?.verified) {
            router.push('/');
        }
    }, [user?.user?.verified]);

    return (
        <>
            <OtpComp title='Vefify account' />
        </>
    );
}
