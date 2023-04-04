'use client';

import { CartType } from '@/components/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CartPage: React.FC = () => {
    const cart = useSelector((state: any) => state.user.cart as CartType[]);

    const [quantity, setQuantity] = useState(() => {
        if (cart.length > 0) {
            return cart.map((item) => item.product_size.quantity);
        }
        return 1;
    });

    return (
        <section className=' max-w-[1260px] mx-auto mt-9'>
            <div className='flex items-center gap-1 justify-center w-full'>
                <i className='fa-solid fa-cart-shopping text-2xl'></i>
                <h1 className=' text-2xl font-bold'>Your Cart</h1>
            </div>
            <div className='flex gap-16 flex-wrap mt-5'>
                <div className='w-[calc(70%-32px)]'>
                    <div className='flex flex-col gap-5'>
                        {cart && cart.length > 0 ? (
                            cart.map((item: CartType, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between'>
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
                                                            item.product_size
                                                                .size_name
                                                        }
                                                    </span>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <button
                                                        className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                        // onClick={HANDLE.decreaseQuantity}
                                                        // disabled={quantity <= 1}
                                                    >
                                                        <i className='fa-solid fa-minus text-sm text-white'></i>
                                                    </button>
                                                    <input
                                                        className=' text-center border border-colorPrimary w-[70px] py-1 text-sm rounded-md'
                                                        type='number'
                                                        value={quantity}
                                                        onChange={(e) => {
                                                            setQuantity(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <button
                                                        className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                        // onClick={HANDLE.increaseQuantity}
                                                        // disabled={
                                                        //     product.sizes.find(
                                                        //         (item) =>
                                                        //             item.size_name === size
                                                        //     )?.quantity === quantity
                                                        // }
                                                    >
                                                        <i className='fa-solid fa-plus text-white'></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <p className=' font-medium text-colorPrimary'>
                                                {item.product_price.toLocaleString()}
                                                ₫
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>
                                Your cart is empty.{' '}
                                <a href='/'>Continue Shopping</a>
                            </p>
                        )}
                    </div>
                </div>
                <div className='w-[calc(30%-32px)] px-3 py-4'>
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
                                .reduce(
                                    (acc, item) => acc + item.product_price,
                                    0
                                )
                                .toLocaleString()}
                            ₫
                        </p>
                    </div>

                    <div className='mt-10'>
                        <button className='py-3 w-full bg-colorPrimary text-white font-medium text-sm hover:bg-colorPrimaryHover rounded-md'>
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

CartPage.displayName = 'CartPage';

export default CartPage;
