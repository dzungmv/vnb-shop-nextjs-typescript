'use client';

import LoadingCard from '@/components/common/loading-card';
import { setCart } from '@/components/redux/user/userSlice';
import { CartType, UserTypes } from '@/components/types';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartStore: CartType[] = useSelector((state: any) => state.user.cart);
    const user: UserTypes = useSelector((state: any) => state.user.user);

    const [cart, setCart] = useState<CartType[]>(cartStore);
    const [error, setError] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const HANDLE = {
        increasingQuantity: (_id: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    oldProducts[productIndex].product_size.quantity += 1;
                    return [...oldProducts];
                });
            }
        },
        decreasingQuantity: (_id: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    oldProducts[productIndex].product_size.quantity -= 1;
                    return [...oldProducts];
                });
            }
        },
        setQuantity: (_id: string, quantity: string) => {
            setCart((oldProducts: CartType[]) => {
                const productIndex = oldProducts.findIndex((product) => {
                    return product._id === _id;
                });

                if (productIndex !== -1) {
                    oldProducts[productIndex].product_size.quantity =
                        Number(quantity);
                }

                return [...oldProducts];
            });
        },
        removeProductById: (_id: string) => {
            setCart((oldProducts: CartType[]) => {
                const productIndex = oldProducts.findIndex((product) => {
                    return product._id === _id;
                });

                if (productIndex !== -1) {
                    oldProducts.splice(productIndex, 1);
                }

                return [...oldProducts];
            });
        },
        checkout: async () => {
            try {
                setIsPending(true);
                await axios.post(
                    `${process.env.SERVER_URL}/user/checkout`,
                    {
                        cart,
                    },
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                setIsPending(false);
            } catch (error) {
                console.log(error);
                setIsPending(false);
            }
        },
    };

    return (
        <section className=' max-w-[1260px] mx-auto mt-9'>
            <div className='flex items-center gap-1 justify-center w-full'>
                <i className='fa-solid fa-cart-shopping text-2xl'></i>
                <h1 className=' text-2xl font-bold'>Your Cart</h1>
            </div>
            <div className='flex gap-16 flex-wrap mt-5'>
                <div className='w-[calc(70%-32px)] tablet:w-full'>
                    <div className='flex flex-col gap-5'>
                        {cart && cart?.length > 0 ? (
                            cart?.map((item: CartType, index: number) => {
                                return (
                                    <div key={index}>
                                        <div className='flex items-center justify-between flex-wrap mb-5'>
                                            <div className='flex items-center'>
                                                <figure className='w-[80px]'>
                                                    <Image
                                                        className='w-full h-full object-cover'
                                                        src={item.product_image}
                                                        alt='Product img'
                                                        width='0'
                                                        height='0'
                                                        sizes='100vw'
                                                    />
                                                </figure>

                                                <h2 className='font-medium'>
                                                    {item.product_name}
                                                </h2>
                                            </div>

                                            <div className='flex items-center gap-10'>
                                                <div className='flex items-center gap-3'>
                                                    <div>
                                                        Size:{' '}
                                                        <span>
                                                            {
                                                                item
                                                                    .product_size
                                                                    .size_name
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <button
                                                            className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                            onClick={() =>
                                                                HANDLE.decreasingQuantity(
                                                                    item._id
                                                                )
                                                            }
                                                            disabled={
                                                                item
                                                                    .product_size
                                                                    .quantity <=
                                                                1
                                                            }>
                                                            <i className='fa-solid fa-minus text-sm text-white'></i>
                                                        </button>
                                                        <input
                                                            className=' text-center border border-colorPrimary w-[70px] py-1 text-sm rounded-md'
                                                            type='number'
                                                            value={
                                                                item
                                                                    .product_size
                                                                    .quantity
                                                            }
                                                            onChange={(e) => {
                                                                HANDLE.setQuantity(
                                                                    item._id,
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                        <button
                                                            className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                            onClick={() =>
                                                                HANDLE.increasingQuantity(
                                                                    item._id
                                                                )
                                                            }>
                                                            <i className='fa-solid fa-plus text-white'></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className=' font-medium text-colorPrimary'>
                                                    {item.product_price.toLocaleString()}
                                                    ₫
                                                </p>

                                                <div
                                                    className='group hover:cursor-pointer'
                                                    onClick={() =>
                                                        HANDLE.removeProductById(
                                                            item._id
                                                        )
                                                    }>
                                                    <i className='fa-solid fa-trash text-gray-600 group-hover:text-colorPrimary'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })
                        ) : (
                            <p className='text-center'>
                                Your cart is empty.{' '}
                                <a
                                    href='/product'
                                    className='font-medium text-colorPrimary'>
                                    Continue Shopping
                                </a>
                            </p>
                        )}
                    </div>
                </div>
                {cart && cart.length > 0 && (
                    <div className='w-[calc(30%-32px)] tablet:w-full px-3 py-4 mobile:px-0'>
                        <div className='mb-6'>
                            <p className='text-xs'>Enter promote code</p>
                            <div className='border flex'>
                                <input
                                    type='text'
                                    className='flex-1 text-sm py-2 px-2 bg-transparent'
                                />
                                <button className='w-[30%] bg-black text-sm font-medium text-white '>
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between text-sm'>
                            <p>Shipping cost</p>
                            <p>Free</p>
                        </div>
                        <div className='flex items-center justify-between text-sm'>
                            <p>Discount</p>
                            <p>-0₫</p>
                        </div>
                        <div className='flex items-center justify-between text-sm'>
                            <p>Tax</p>
                            <p>VAT</p>
                        </div>

                        <div className='flex items-center justify-between font-medium mt-2'>
                            <p className=''>Estimated total</p>
                            <p>
                                {cart
                                    ?.reduce(
                                        (acc, item) =>
                                            acc +
                                            item.product_size.quantity *
                                                item.product_price,
                                        0
                                    )
                                    .toLocaleString()}
                                ₫
                            </p>
                        </div>

                        <div className='mt-10'>
                            {isPending && (
                                <div className='mb-3'>
                                    <LoadingCard
                                        width='25'
                                        height='25'
                                        content='Checkout in processing...'
                                    />
                                </div>
                            )}

                            <button
                                className='py-3 w-full bg-colorPrimary text-white font-medium text-sm hover:bg-colorPrimaryHover rounded-md'
                                onClick={HANDLE.checkout}>
                                Check out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

CartPage.displayName = 'CartPage';

export default CartPage;
