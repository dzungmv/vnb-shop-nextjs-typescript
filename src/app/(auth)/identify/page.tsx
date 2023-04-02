import IdentifyPage from '@/components/package/auth/identify';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot password!',
};

export default function Page() {
    return (
        <>
            <IdentifyPage />
        </>
    );
}
