'use client';

import { useEffect, useState } from 'react';
import { CartType, OrderType, UserTypes } from '@/components/types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import swal from 'sweetalert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OrderedPage: React.FC = () => {
    const user: UserTypes = useSelector((state: any) => state.user.user);
    const [ordered, setOrdered] = useState<OrderType[]>([]);

    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setIsPending(true);
                const res = await axios.get(
                    `${process.env.SERVER_URL}/user/get-order`,
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );

                setOrdered(res?.data?.data?.orders);
                setIsPending(false);
            } catch (error) {
                console.log(error);
                setIsPending(false);
            }
        })();
    }, []);

    return (
        <section className='max-w-[980px] mx-auto mt-8'>
            <header className='bg-white rounded-md mb-5'>
                <h1 className=' text-2xl font-semibold'>Your ordered</h1>
                <div></div>
            </header>

            {!isPending ? (
                <div className=''>
                    {ordered && ordered.length > 0 ? (
                        ordered?.map((order: OrderType) => {
                            return (
                                <div
                                    key={order._id}
                                    className=' px-3 py-4 border rounded mb-10'>
                                    <div className='flex justify-end gap-2 mb-3'>
                                        <div>
                                            {order.status === 'pending' ? (
                                                <span className='text-sm text-yellow-600 font-medium'>
                                                    {' '}
                                                    Preparing products
                                                </span>
                                            ) : (
                                                <span className='text-sm text-colorPrimary'>
                                                    {' '}
                                                    Delivered
                                                </span>
                                            )}
                                        </div>
                                        <span className=' text-gray-400'>
                                            |
                                        </span>
                                        <div>
                                            {order.status !== 'success' ? (
                                                <span className='text-sm text-red-500'>
                                                    NOT COMPLETED
                                                </span>
                                            ) : (
                                                <span className='text-sm text-green-500'>
                                                    COMPLETED
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {order.products?.map(
                                            (
                                                product: CartType,
                                                index: number
                                            ) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className='flex items-center justify-between'>
                                                        {' '}
                                                        <div className='flex items-center gap-3'>
                                                            <figure className='w-[100px] h-[100px] mobile:w-16 mobile:h-16'>
                                                                <Image
                                                                    className='w-full h-full object-cover'
                                                                    src={
                                                                        product.product_image
                                                                    }
                                                                    alt={
                                                                        product.product_name
                                                                    }
                                                                    width='0'
                                                                    height='0'
                                                                    sizes='100vw'
                                                                />
                                                            </figure>

                                                            <div className='flex-1'>
                                                                <h2 className='font-semibold text-lg mobile:text-base'>
                                                                    {
                                                                        product.product_name
                                                                    }
                                                                </h2>
                                                                <p className='text-sm mt-2'>
                                                                    Qty:{' '}
                                                                    <span>
                                                                        {
                                                                            product.product_quantity
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='font-medium text-colorPrimary'>
                                                            {product.product_price.toLocaleString()}
                                                            ₫
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>

                                    <hr className='w-[90%] mx-auto my-3' />

                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm'>
                                            {order.createdAt?.slice(0, 10)}
                                        </span>
                                        <div className='flex justify-center'>
                                            <p className='flex items-center gap-1'>
                                                <i className='fa-solid fa-coins text-colorPrimary'></i>
                                                Total:{' '}
                                                <span className=' font-semibold text-lg text-colorPrimary'>
                                                    {order.total.toLocaleString()}
                                                    ₫
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='w-full min-h-[70vh] bg-white flex items-center justify-center flex-col mb-10'>
                            <Image
                                className='w-[40%] h-[40%] object-contain'
                                src='https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/icons/null-order.svg'
                                alt='No ordered'
                                width='0'
                                height='0'
                                sizes='100vw'
                            />
                            <h2 className='mt-10 font-semibold text-2xl'>
                                No ordered
                            </h2>
                        </div>
                    )}
                </div>
            ) : (
                <div className='w-full h-[300px]'>
                    <Skeleton className='w-full' count={3} height={100} />
                </div>
            )}
        </section>
    );
};

OrderedPage.displayName = 'OrderedPage';

export default OrderedPage;
