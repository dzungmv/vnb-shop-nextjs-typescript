'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { ProductType, UserTypes } from '@/components/types';

type Props = {
    product: ProductType;
};

let socket;

const ProductDetails: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user as UserTypes);

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = async () => {
        socket = io(`${process.env.SERVER_URL}`);
    };

    const [quantity, setQuantity] = useState<number>(1);
    const [size, setSize] = useState<string>('');

    const HANDLE = {
        increaseQuantity: (): void => {
            setQuantity((prev) => prev + 1);
        },
        decreaseQuantity: (): void => {
            setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
        },
        addtoCart: (): void => {
            console.log('add to cart');

            // if (!user?.user?._id) {
            //     router.push('/auth');
            // }
        },
    };
    return (
        <section className=' max-w-[1260px] mx-auto mt-8'>
            <div className='flex gap-7 items-start flex-wrap mb-8'>
                <div className='w-[calc(75%-14px)] tablet:w-full mobile:gap-y-4'>
                    <div className='w-full flex flex-wrap'>
                        <figure className='w-[50%] mobile:w-full'>
                            <Image
                                className='w-full '
                                src={product.image}
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

                            <div className='flex text-center gap-1 mt-2 text-sm'>
                                <p>
                                    Branch:{' '}
                                    <span className=' text-colorPrimary'>
                                        {product.brand}
                                    </span>
                                </p>
                                |
                                <p>
                                    Status:{' '}
                                    <span className=' text-colorPrimary'>
                                        In stock
                                    </span>
                                </p>
                            </div>

                            <div className='flex mt-2 items-center gap-3'>
                                <h3 className=' text-[24px] font-medium text-colorPrimary'>
                                    {product.price.toLocaleString()}₫
                                </h3>
                                <p className='text-lg text-gray-400 line-through'>
                                    Maket price:{' '}
                                    {product.price_market.toLocaleString()}₫
                                </p>
                            </div>

                            <div className='p-3 mt-7 border border-dashed border-colorPrimary relative rounded-lg bg-slate-50'>
                                <div className='flex flex-col gap-2 pt-4'>
                                    {product.endows.map((item, index) => {
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
                                    {product.sizes.map((item, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={
                                                    item.size_name === size
                                                        ? 'border rounded-md px-3 py-1 text-sm bg-colorPrimary text-white disabled:bg-gray-300 disabled:text-gray-500'
                                                        : 'border rounded-md px-3 py-1 text-sm disabled:bg-gray-300 disabled:text-gray-500'
                                                }
                                                disabled={item.quantity === 0}
                                                onClick={() =>
                                                    setSize(item.size_name)
                                                }>
                                                {item.size_name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className=' flex items-center gap-5 mt-4'>
                                <div className='flex items-center gap-1'>
                                    <button
                                        className='w-[26px] h-[26px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                        onClick={HANDLE.decreaseQuantity}
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
                                        onClick={HANDLE.increaseQuantity}
                                        disabled={
                                            product.sizes.find(
                                                (item) =>
                                                    item.size_name === size
                                            )?.quantity === quantity
                                        }>
                                        <i className='fa-solid fa-plus text-white'></i>
                                    </button>
                                </div>

                                <button
                                    className=' py-2 px-3 text-sm font-medium rounded-md text-colorPrimary border border-colorPrimary hover:bg-colorPrimary hover:text-white'
                                    onClick={HANDLE.addtoCart}>
                                    <i className='fa-solid fa-cart-shopping'></i>
                                    <span> Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='mt-20'>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-2xl font-bold mb-4'>
                                {' '}
                                Descriptions
                            </h2>
                            <div className='flex-1'>
                                <hr />
                            </div>
                        </div>
                        <div
                            className=''
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}></div>
                    </div>
                </div>

                <div className=' w-[calc(25%-14px)] border border-dashed border-colorPrimary p-3 rounded-lg mt-5 tablet:w-full sticky top-[95px]'>
                    <div className=' bg-colorPrimary mt-1'>
                        {product.stores.map((item, index) => {
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
