'use client';

import Image from 'next/image';
import { useState } from 'react';

const product = {
    id: '1',
    name: 'Kawasaki Racket 3307 - White red',
    imgage: 'https://shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-clear-ny-chinh-hang.jpg',
    price: 1000000,
    price_stock: 1200000,
    attributes: {
        code: 'VNB014614',
        branch: 'Kawasaki',
        status: 'In stock',
        endow: [
            'Free 2 Badminton Rackets: VNB 001 , VS002 or Joto 001',
            'Genuine products',
            'Free single bag or velvet cover to protect the racket',
            'Payment after inspection and receipt (Delivery of racket frame)',
            'Genuine warranty according to the manufacturer (Except for domestic and portable goods)',
        ],
        size: [
            {
                name: '3U',
                inventory: 12,
            },
            {
                name: '4U',
                inventory: 10,
            },
            {
                name: '5U',
                inventory: 0,
            },
        ],
        store: ['VNB District 1', 'VNB District 2', 'VNB District 3'],
        descriptions: {},
    },
};

const ProductDetails: React.FC = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [size, setSize] = useState<string>('');

    const handleIncreaseQuantity = (): void => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };
    return (
        <section className=' max-w-[1260px] mx-auto mt-8'>
            <div className='flex gap-7 items-start flex-wrap'>
                <div className='flex w-[calc(75%-14px)] tablet:w-full flex-wrap mobile:gap-y-4'>
                    <figure className='w-[50%] mobile:w-full'>
                        <Image
                            className='w-full '
                            src={product.imgage}
                            alt={product.name}
                            width='0'
                            height='0'
                            sizes='100vw'
                            priority
                        />
                    </figure>

                    <div className='w-[50%] mobile:w-full'>
                        <h1 className='text-2xl font-bold text-gray-700'>
                            {product.name}
                        </h1>
                        <p className='mt-4 text-sm'>
                            Code:{' '}
                            <span className=' text-colorPrimary'>
                                {product.attributes.code}
                            </span>
                        </p>

                        <div className='flex text-center gap-1 mt-2 text-sm'>
                            <p>
                                Branch:{' '}
                                <span className=' text-colorPrimary'>
                                    {product.attributes.branch}
                                </span>
                            </p>
                            |
                            <p>
                                Status:{' '}
                                <span className=' text-colorPrimary'>
                                    {product.attributes.status}
                                </span>
                            </p>
                        </div>

                        <div className='flex mt-2 items-center gap-3'>
                            <h3 className=' text-[24px] font-medium text-colorPrimary'>
                                {product.price.toLocaleString()}₫
                            </h3>
                            <p className='text-lg text-gray-400 line-through'>
                                Maket price:{' '}
                                {product.price_stock.toLocaleString()}₫
                            </p>
                        </div>

                        <div className='p-3 mt-7 border border-dashed border-colorPrimary relative rounded-lg bg-slate-50'>
                            <div className='flex flex-col gap-2 pt-4'>
                                {product.attributes.endow.map((item, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className='flex items-center gap-2 text-sm'>
                                            <i className='fa-solid fa-check text-[#685487]'></i>
                                            <span>{item}</span>
                                        </p>
                                    );
                                })}
                            </div>

                            <div className=' absolute top-[-17px] left-3  px-5 border py-1 border-colorPrimary rounded bg-white flex items-center gap-2'>
                                <i className='fa-solid fa-gift text-xl text-[#685487] animate-bell'></i>
                                <span className='text-[#685487] font-medium'>
                                    Endow
                                </span>
                            </div>
                        </div>

                        <div className='mt-5 flex items-center gap-3 '>
                            <p className=' text-sm'>Choose size: </p>
                            <div className='flex items-center gap-2'>
                                {product.attributes.size.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={
                                                item.name === size
                                                    ? 'border rounded-md px-3 py-1 text-sm bg-colorPrimary text-white disabled:bg-gray-300 disabled:text-gray-500'
                                                    : 'border rounded-md px-3 py-1 text-sm disabled:bg-gray-300 disabled:text-gray-500'
                                            }
                                            disabled={item.inventory === 0}
                                            onClick={() => setSize(item.name)}>
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className=' flex items-center gap-5 mt-4'>
                            <div className='flex items-center gap-1'>
                                <button
                                    className='w-[26px] h-[26px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                    onClick={handleDecreaseQuantity}
                                    disabled={quantity <= 1}>
                                    <i className='fa-solid fa-minus text-sm text-white'></i>
                                </button>
                                <input
                                    className=' text-center border border-colorPrimary w-[90px] py-1 rounded-md'
                                    type='number'
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                />
                                <button
                                    className='w-[26px] h-[26px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                    onClick={handleIncreaseQuantity}
                                    disabled={
                                        product.attributes.size.find(
                                            (item) => item.name === size
                                        )?.inventory === quantity
                                    }>
                                    <i className='fa-solid fa-plus text-white'></i>
                                </button>
                            </div>

                            <button className=' py-2 px-3 text-sm font-medium rounded-md text-colorPrimary border border-colorPrimary hover:bg-colorPrimary hover:text-white'>
                                <i className='fa-solid fa-cart-shopping'></i>
                                <span> Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className=' w-[calc(25%-14px)] border border-dashed border-colorPrimary relative p-3 rounded-lg mt-5 tablet:w-full'>
                    <div className=' bg-colorPrimary mt-1'>
                        {product.attributes.store.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className='flex items-center gap-2 p-1 pl-4 text-sm font-medium text-white'>
                                        {' '}
                                        {item}{' '}
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>

                    <div className=' absolute top-[-17%] left-2  px-5 py-1 border border-colorPrimary rounded bg-white text-colorPrimary font-medium'>
                        Available at
                    </div>
                </div>
            </div>
        </section>
    );
};

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;
