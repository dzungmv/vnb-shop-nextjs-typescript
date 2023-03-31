import LoginComp from '@/components/package/auth';
import Header from '@/components/package/header';
import SubHeaderComp from '@/components/package/header/subheader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VNB - Authentication',
};

export default function Page() {
    return (
        <>
            <SubHeaderComp />
            <Header />
            <LoginComp />
        </>
    );
}
