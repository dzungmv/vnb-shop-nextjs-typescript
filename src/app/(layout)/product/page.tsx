import ProductsPage from '@/components/package/product/products';
import { ProductType } from '@/components/types';
import axios from 'axios';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
};

export default async function Page() {
    const res = await fetch(
        `${process.env.SERVER_URL}/product/get-all-product`,
        {
            cache: 'no-cache',
        }
    );
    const parseJSON = await res.json();
    const products = parseJSON.data as ProductType[];

    return (
        <>
            <ProductsPage products={products} />
        </>
    );
}
