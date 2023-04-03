import ProductDetails from '@/components/package/product/product-details';
import { ProductType } from '@/components/types';
import axios from 'axios';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
    params: {
        productSlug: string;
    };
};

export async function generateMetadata({
    params: { productSlug },
}: Params): Promise<Metadata> {
    const res = await fetch(
        `${process.env.SERVER_URL}/product/get-product/${productSlug}`
    );

    const parseJSON = await res.json();

    if (parseJSON.status === false) {
        return {
            title: 'Product not found!',
        };
    }

    const product = (await parseJSON.data) as ProductType;

    const metadata = {
        title: product?.name,
        icon: '/icon.png',
    };

    return metadata;
}

export default async function Page({ params: { productSlug } }: Params) {
    const res = await fetch(
        `${process.env.SERVER_URL}/product/get-product/${productSlug}`
    );

    const parseJSON = await res.json();

    if (parseJSON.status === false) {
        return notFound();
    }
    const product = parseJSON.data as ProductType;
    return (
        <>
            <ProductDetails product={product} />
        </>
    );
}
