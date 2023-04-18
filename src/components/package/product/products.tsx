'use client';

import Tippy from '@tippyjs/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/themes/light.css';

import LoadingCard from '@/components/common/loading-card';
import ProductCard from '@/components/common/product-card';
import catalogData from '@/components/data/catalog.json';
import filterUI from '@/components/data/filter.json';
import { CatalogItem, FilterItem, ProductType } from '@/components/types';

const ProductsPage: React.FC = () => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const [dataProducts, setDataProducts] = useState<ProductType[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const [price, setPrice] = useState<string>('');
    const [brand, setBrand] = useState<string[]>([]);
    const [stores, setStores] = useState<string[]>([]);

    const [sort, setSort] = useState<string>('');

    const [filterBar, setFilterBar] = useState<boolean>(false);

    const elementRef = useRef<HTMLDivElement>(null);
    const filterBarRef = useRef<HTMLDivElement>(null);

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore) {
            HANDLE.loadMore();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            onIntersection(entries);
        });

        if (observer && elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [dataProducts]);

    const HANDLE = {
        loadMore: async () => {
            try {
                const res = await axios.get(
                    `${process.env.SERVER_URL}/product/get-products?page=${page}&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
                );

                if (res.data.data.length === 0) {
                    setHasMore(false);
                }

                setPage((prev) => prev + 1);
                setDataProducts((prevData) => [...prevData, ...res.data.data]);
            } catch (error) {
                setHasMore(false);
            }
        },
        sortPriceIncreasing: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=price_asc&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },

        sortPriceDecreasing: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },
        sortNameIncreasing: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },
        sortNameDecreasing: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },
        filterByBrand: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },
        filterByPrice: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },

        filterByStores: async () => {
            setHasMore(true);
            setPage(1);

            const res = await axios.get(
                `${process.env.SERVER_URL}/product/get-products?page=1&limit=12&sort=${sort}&brand=${brand}&price=${price}&stores=${stores}`
            );

            setDataProducts(res.data.data);
            setPage((prev) => prev + 1);
        },
    };

    useEffect(() => {
        if (sort === 'price_asc') {
            HANDLE.sortPriceIncreasing();
        }

        if (sort === 'price_desc') {
            HANDLE.sortPriceDecreasing();
        }

        if (sort === 'name_asc') {
            HANDLE.sortNameIncreasing();
        }

        if (sort === 'name_desc') {
            HANDLE.sortNameDecreasing();
        }
    }, [sort]);

    useEffect(() => {
        if (brand.length > 0) {
            HANDLE.filterByBrand();
        }
        if (filterBarRef.current) {
            setFilterBar(false);
        }
    }, [brand]);

    useEffect(() => {
        if (price.length > 0) {
            HANDLE.filterByPrice();
        }

        if (filterBarRef.current) {
            setFilterBar(false);
        }
    }, [price]);

    useEffect(() => {
        if (stores.length > 0) {
            HANDLE.filterByStores();
        }
        if (filterBarRef.current) {
            setFilterBar(false);
        }
    }, [stores]);

    return (
        <>
            <section className='max-w-[1260px] mx-auto mt-8 flex gap-5 items-start'>
                <div className='w-[23%] rounded-lg border p-3 tablet:hidden'>
                    <div className='pb-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.price.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.price.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='radio'
                                            id={item.title}
                                            value={item.value}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                            checked={price === item.value}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr />

                    <div className='py-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.brand.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.brand.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            id={item.title}
                                            value={item.title}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setBrand((prev) => [
                                                        ...prev,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    setBrand((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item !==
                                                                e.target.value
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={brand.includes(item.title)}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <hr />
                    <div className='py-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.agency.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.agency.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            id={item.title}
                                            value={item.title}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setStores((prev) => [
                                                        ...prev,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    setStores((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item !==
                                                                e.target.value
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={stores.includes(
                                                item.title
                                            )}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='w-[77%] tablet:w-full'>
                    <div className='flex flex-wrap my-5 gap-5 mt-0'>
                        {catalogData.map((item: CatalogItem) => {
                            return (
                                <Link
                                    key={item.id}
                                    className={
                                        'group w-[calc(100%/4-15px)] h-[100px] rounded-lg relative overflow-hidden flex items-center justify-center transition-all hover:bg-[rgba(0,0,0,0.7)] hover:cursor-pointer mobile:w-full onlyTablet:w-[calc(100%/2-15px)]'
                                    }
                                    href={`/product/${item.href}`}>
                                    <Image
                                        className='w-full h-full object-cover rounded-lg z-[-1]'
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        width='0'
                                        height='0'
                                        sizes='100vw'
                                    />

                                    <div className='absolute text-white font-medium text-lg animate-fadeUp hidden group-hover:block z-1 tablet:block tablet:animate-none'>
                                        {item.name}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <header className='flex items-center justify-between'>
                        <h2 className='font-medium text-xl'>Products</h2>
                        <div className='flex gap-2 items-center text-sm'>
                            <div>
                                <i className='fa-solid fa-bars-sort'></i>
                                <span className='ml-1 text-gray-500'>
                                    Sort:
                                </span>
                            </div>

                            <Tippy
                                content={
                                    <section className='w-[200px]'>
                                        <div
                                            className='p-2 hover:bg-gray-200 hover:cursor-pointer'
                                            onClick={() => setSort('name_asc')}>
                                            A-Z
                                        </div>
                                        <div
                                            className='p-2 hover:bg-gray-200 hover:cursor-pointer'
                                            onClick={() =>
                                                setSort('name_desc')
                                            }>
                                            Z-A
                                        </div>
                                        <div
                                            className='p-2 hover:bg-gray-200 hover:cursor-pointer'
                                            onClick={() =>
                                                setSort('price_asc')
                                            }>
                                            Price increasing
                                        </div>
                                        <div
                                            className='p-2 hover:bg-gray-200 hover:cursor-pointer'
                                            onClick={() =>
                                                setSort('price_desc')
                                            }>
                                            Price decreasing
                                        </div>
                                    </section>
                                }
                                arrow={false}
                                interactive
                                theme='light'
                                placement='bottom'>
                                <div
                                    className='group hover:cursor-pointer flex items-center gap-1'
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}>
                                    {sort && sort.length > 0 ? (
                                        <p className='first-letter:uppercase'>
                                            {sort}
                                        </p>
                                    ) : (
                                        'Default'
                                    )}

                                    <i
                                        className={
                                            isHover
                                                ? 'fa-regular fa-chevron-up transition-all'
                                                : 'fa-regular fa-chevron-down transition-all'
                                        }></i>
                                </div>
                            </Tippy>
                        </div>
                    </header>

                    <div className='flex flex-wrap gap-3 mt-3'>
                        {dataProducts.map(
                            (item: ProductType, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className='w-[calc(100%/4-9px)] onlyTablet:w-[calc(100%/3-8px)] mobile:w-full'>
                                        <ProductCard
                                            id={item._id}
                                            name={item.name}
                                            slug={item.slug}
                                            price={item.price}
                                            imageSrc={item.image}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>

                    {hasMore && (
                        <div
                            ref={elementRef}
                            className='flex justify-center mt-5'>
                            <LoadingCard
                                width='25'
                                height='25'
                                content='Load more...'
                            />
                        </div>
                    )}
                </div>
            </section>

            <div
                className='hidden fixed right-0 top-[50%] bottom-[50%] py-9 px-2 bg-colorPrimary tablet:flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]'
                onClick={() => setFilterBar((prev) => !prev)}>
                <i className='fa-solid fa-filter-list text-white'></i>
            </div>

            {filterBar && (
                <div
                    ref={filterBarRef}
                    className='w-[100%] p-3 fixed top-0 left-0 right-0 bottom-0 animate-fadeInLeft bg-white z-[1001] overflow-y-auto'>
                    <header className='flex justify-end'>
                        <div
                            className='w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:cursor-pointer'
                            onClick={() => setFilterBar((prev) => !prev)}>
                            <i className='fa-sharp fa-regular fa-xmark'></i>
                        </div>
                    </header>
                    <div className='pb-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.price.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.price.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='radio'
                                            id={item.title}
                                            value={item.value}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                            checked={price === item.value}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr />

                    <div className='py-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.brand.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.brand.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            id={item.title}
                                            value={item.title}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setBrand((prev) => [
                                                        ...prev,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    setBrand((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item !==
                                                                e.target.value
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={brand.includes(item.title)}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <hr />
                    <div className='py-4'>
                        <h2 className='font-medium mb-2 text-lg text-gray-600'>
                            {filterUI.agency.name}
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {filterUI.agency.values.map((item: FilterItem) => {
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            id={item.title}
                                            value={item.title}
                                            className='hover:cursor-pointer'
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setStores((prev) => [
                                                        ...prev,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    setStores((prev) =>
                                                        prev.filter(
                                                            (item) =>
                                                                item !==
                                                                e.target.value
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={stores.includes(
                                                item.title
                                            )}
                                        />
                                        <label
                                            htmlFor={item.title}
                                            className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                            {item.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ProductsPage.displayName = 'ProductsPage';

export default ProductsPage;
