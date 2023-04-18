'use client';

import LoadingCard from '@/components/common/loading-card';
import Modal from '@/components/common/modal';
import { CartType, OrderType, UserTypes } from '@/components/types';
import axios from 'axios';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const OrderedPage: React.FC = () => {
    const router = useRouter();
    const user: UserTypes = useSelector((state: any) => state.user.user);
    const [ordered, setOrdered] = useState<OrderType[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const [cancelModal, setCancelModal] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');
    const [isCancelPending, setIsCancelPending] = useState<boolean>(false);

    const sortedOrder = ordered?.sort((x: OrderType, y: OrderType) => {
        return new Date(x.updatedAt) < new Date(y.updatedAt) ? 1 : -1;
    });

    const HANDLE = {
        openCancelModal: (id: string) => {
            setOrderId(id);
            setCancelModal(true);
        },
        cancelOrder: async () => {
            try {
                setIsCancelPending(true);
                const res = await axios.put(
                    `${process.env.SERVER_URL}/user/update-order`,
                    {
                        orderId,
                        status: 'cancelled',
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );

                setIsCancelPending(false);
                setCancelModal(false);
                swal({
                    title: 'Success',
                    text: 'Order has been cancelled!',
                    icon: 'success',
                }).then(() => {
                    router.push('/order/cancelled');
                });
            } catch (error) {
                setIsCancelPending(false);
                console.error(error);
            }
        },
    };

    useEffect(() => {
        if (!user?.user?._id) {
            redirect('/');
        }
    }, [user]);

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
                setIsPending(false);
            }
        })();
    }, []);

    return (
        <>
            <section>
                {!isPending ? (
                    <div>
                        {sortedOrder && sortedOrder.length > 0 ? (
                            sortedOrder?.map((order: OrderType) => {
                                return (
                                    <div
                                        key={order._id}
                                        className='px-3 py-4 border rounded mb-10'>
                                        <div className='flex justify-end gap-2 mb-3'>
                                            <div
                                                className={`uppercase
                                            ${
                                                order.status === 'pending' &&
                                                'text-yellow-500'
                                            } 
    
                                            ${
                                                order.status === 'shipping' &&
                                                'text-blue-500'
                                            } 
    
                                            ${
                                                order.status === 'completed' &&
                                                'text-green-500'
                                            } 
    
                                            ${
                                                order.status === 'cancelled' &&
                                                'text-red-500'
                                            }`}>
                                                {order.status}
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
                                                    <span className='font-semibold text-lg text-colorPrimary'>
                                                        {order.total.toLocaleString()}
                                                        ₫
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {order.status === 'pending' && (
                                            <div className='flex justify-end items-center mt-4'>
                                                <button
                                                    className='px-5 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white'
                                                    onClick={() => {
                                                        HANDLE.openCancelModal(
                                                            order._id
                                                        );
                                                    }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
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
                    <div className='h-[500px]'>
                        <div className='px-3 py-4 border rounded mb-10'>
                            <div className='flex justify-end mb-3'>
                                <div className='w-[100px] h-[20px] bg-gray-200 animate-pulse'></div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <figure className='w-[100px] h-[100px] mobile:w-16 mobile:h-16 bg-gray-200 animate-pulse'></figure>

                                        <div className='flex-1'>
                                            <h2 className='w-[400px] mobile:w-[70px] h-5 bg-gray-200 animate-pulse mb-1'></h2>
                                            <h2 className='w-16 h-5 bg-gray-200 animate-pulse'></h2>
                                        </div>
                                    </div>
                                    <div className='w-16 h-5 bg-gray-200 animate-pulse'></div>
                                </div>
                            </div>

                            <hr className='w-[90%] mx-auto my-3' />

                            <div className='flex justify-between items-center'>
                                <span className='w-16 h-5 bg-gray-200 animate-pulse'></span>
                                <div className='flex justify-center'>
                                    <p className='w-16 h-5 bg-gray-200 animate-pulse'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {cancelModal && (
                <Modal
                    title='Cancel order'
                    open={cancelModal}
                    close={() => {
                        setOrderId('');
                        setCancelModal(false);
                    }}>
                    <div className='w-[500px] p-3 mobile:w-full'>
                        <p className='py-5'>
                            Are you sure you want to cancel this order?
                        </p>

                        <div className='flex justify-end items-center gap-2'>
                            {isCancelPending && (
                                <LoadingCard
                                    width='23'
                                    height='23'
                                    content='Cancel in processing...'
                                />
                            )}
                            <div
                                className='hover:cursor-pointer hover:bg-slate-200 py-2 px-3 rounded-md'
                                onClick={() => {
                                    setOrderId('');
                                    setCancelModal(false);
                                }}>
                                Close
                            </div>
                            <button
                                className='py-2 px-4 rounded-md bg-colorPrimary text-white text-sm font-medium hover:bg-colorPrimaryHover'
                                onClick={HANDLE.cancelOrder}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

OrderedPage.displayName = 'OrderedPage';

export default OrderedPage;
