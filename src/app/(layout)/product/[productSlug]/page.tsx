import ProductDetails from '@/components/package/product/product-details';

type ProductSlug = {
    productSlug: string;
};

export function generateMetadata({ params }: { params: ProductSlug }) {
    const { productSlug } = params;
    const metadata = {
        title: productSlug,
    };
    return metadata;
}
export default function Page({ params }: { params: ProductSlug }) {
    return (
        <>
            <ProductDetails />
        </>
    );
}
