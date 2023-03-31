export type UserTypes = {

    user: {
        id: string | number;
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
    value: string;
}

export type ProductCard = {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    imageSrc: string;

}