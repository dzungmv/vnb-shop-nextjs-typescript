import LoadingCard from '@/components/common/loading-card';
import useDebounce from '@/components/hooks/useDebounce';
import { ProductType } from '@/components/types';
import { isPending } from '@reduxjs/toolkit';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
    changeState: (state: boolean) => void | undefined;
};

const SearchComp: React.FC<Props> = ({ changeState }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const searchDeb = useDebounce(searchValue, 800);

    const [searchPending, setSearchPending] = useState<boolean>(false);

    const [searchResult, setSearchResult] = useState<ProductType[]>([]);

    console.log('search', searchResult);

    useEffect(() => {
        if (!searchDeb) return;
        (async () => {
            try {
                setSearchPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/product/search-products`,
                    {
                        keyword: searchDeb,
                    }
                );

                console.log('check', res.data.data);

                setSearchResult(res.data.data);

                setSearchPending(false);
            } catch (error: any) {
                console.log(error);
                setSearchPending(false);
            }
        })();
    }, [searchDeb]);

    return (
        <div className='w-full h-[80%] relative flex'>
            <div
                className='mr-2 w-10 h-10 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-slate-100'
                onClick={() => {
                    setSearchValue('');
                    setSearchResult([]);
                    changeState(false);
                }}>
                <i className='fa-regular fa-arrow-left text-lg text-gray-600'></i>
            </div>
            <div className='w-full h-full bg-bgGray rounded-[20px] flex items-center gap-2 flex-1'>
                <i className='fa-regular fa-magnifying-glass text-gray-500 ml-3'></i>
                <input
                    className='bg-transparent py-px10 w-full text-sm placeholder:text-gray-500'
                    type='text'
                    placeholder='Search product...'
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            <div className='absolute top-[-5px] z-[-1] w-[101%] left-[50%] rounded-b-lg translate-x-[-50%] bg-white shadow-2xl l-0 r-0 pt-14 px-5 pb-4'>
                {searchValue && searchDeb ? (
                    searchPending ? (
                        <div className='my-4 ml-7'>
                            <LoadingCard
                                width='24'
                                height='24'
                                content='Searching product...'
                            />
                        </div>
                    ) : searchResult && searchResult.length > 0 ? (
                        searchResult.map((product: ProductType) => {
                            return (
                                <Link
                                    className='flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100'
                                    key={product._id}
                                    href={`/product/${product.slug}`}
                                    onClick={() => {
                                        setSearchValue('');
                                        setSearchResult([]);
                                        changeState(false);
                                    }}>
                                    <figure className='w-[45px] h-[45px]'>
                                        <Image
                                            className='w-full h-full object-contain'
                                            src={product.image}
                                            alt='product'
                                            width='0'
                                            height='0'
                                            sizes='100vw'
                                        />
                                    </figure>

                                    <div>
                                        {' '}
                                        <p className='font-medium'>
                                            {product.name}
                                        </p>
                                        <span className='text-sm text-colorPrimary'>
                                            {product.price}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <p className='text-sm text-gray-500 text-center py-2'>
                            Not found any product
                        </p>
                    )
                ) : (
                    <p className='text-sm text-gray-500 text-center py-2'>
                        No search recently
                    </p>
                )}
            </div>
        </div>
    );
};

SearchComp.displayName = 'SearchComp';
export default SearchComp;
