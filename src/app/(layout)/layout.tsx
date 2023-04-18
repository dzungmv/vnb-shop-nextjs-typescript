import Footer from '@/components/package/footer';
import Header from '@/components/package/header';
import SubHeaderComp from '@/components/package/header/subheader';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SubHeaderComp />
            <section>
                <Header />
                <main className='laptop:px-4 tablet:px-4'>{children}</main>
            </section>
            <Footer />
        </>
    );
}
