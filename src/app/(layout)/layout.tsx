import Header from '@/components/package/header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
