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

export interface ProductCard {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageSrc: string;

}