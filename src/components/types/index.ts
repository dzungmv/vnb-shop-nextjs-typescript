export type UserTypes = {

    user: {
        _id: string | number;
        name: string;
        email: string;
        role: string;
        verified: boolean;
    },
    tokens: {
        accessToken: string;
        refreshToken: string;
    }

}

export interface CatalogItem {
    id: number;
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

export interface FilterItem {
    id: number;
    title: string;
    value?: string;
}

export type ProductCard = {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    imageSrc: string;

}

export type ProductType = {
    _id: string,
    name: string,
    slug: string,
    image: string,
    type: string,
    price: number,
    price_market: number,
    brand: string,
    endows: string[],
    quantity: number,
    stores: string[],
    description: string,
    createdAt: string,
    updatedAt: string
}

export type CartType = {
    _id: string,
    productId: string,
    product_name: string,
    product_image: string,
    product_price: number,
    product_quantity: number,
}

export type OrderType = {
    _id: string,
    products: CartType[],
    total: number,
    status: string,
    fullname: string,
    address: string,
    phone: string,
    payment: string,
    createdAt: string,
    updatedAt: string
}