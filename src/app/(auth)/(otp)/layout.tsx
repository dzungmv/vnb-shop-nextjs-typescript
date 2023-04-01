import Header from '@/components/package/header';
import SubHeaderComp from '@/components/package/header/subheader';
import type { Metadata } from 'next';

export const meta: Metadata = {
    title: 'OTP verify',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SubHeaderComp />
            <Header />
            {children}
        </>
    );
}
