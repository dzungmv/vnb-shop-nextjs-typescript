import Footer from '@/components/package/footer';
import Header from '@/components/package/header';
import SubHeaderComp from '@/components/package/header/subheader';
import NavComp from '@/components/package/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SubHeaderComp />
            <section>
                <Header />
                <main>{children}</main>
            </section>
            <Footer />
        </>
    );
}
