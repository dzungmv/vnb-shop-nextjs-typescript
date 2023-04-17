'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import LoadingCard from '@/components/common/loading-card';
import { CartType, UserTypes } from '@/components/types';
import { removeCart } from '@/components/redux/user/userSlice';

type ErrorResponseProps = {
    _id: string;
    name: string;
    quantity: number;
};

const CartPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartStore: CartType[] = useSelector((state: any) => state.user.cart);

    // console.log('Cart Store', cartStore);

    const user: UserTypes = useSelector((state: any) => state.user.user);

    const [cart, setCart] = useState<CartType[]>(cartStore);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorOutStock, setErrorOutStock] = useState<ErrorResponseProps[]>(
        []
    );
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isPendingOrder, setIsPendingOrder] = useState<boolean>(false);

    const [fullname, setFullname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [payment, setPayment] = useState<string>('cod');

    const total = cart.reduce((acc: number, item: CartType) => {
        return acc + item.product_quantity * item.product_price;
    }, 0);

    const HANDLE = {
        increasingQuantity: (_id: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    const copy = JSON.stringify(oldProducts);
                    const data = JSON.parse(copy);

                    data[productIndex].product_quantity += 1;

                    return data;
                });
            }
        },
        decreasingQuantity: (_id: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    const copy = JSON.stringify(oldProducts);
                    const data = JSON.parse(copy);

                    data[productIndex].product_quantity -= 1;

                    return data;
                });
            }
        },
        setQuantity: (_id: string, quantity: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    const copy = JSON.stringify(oldProducts);
                    const data = JSON.parse(copy);

                    data[productIndex].product_quantity = parseInt(quantity);

                    return data;
                });
            }
        },
        removeProductById: (_id: string) => {
            const productIndex = cart.findIndex((product) => {
                return product._id === _id;
            });

            if (productIndex !== -1) {
                setCart((oldProducts: CartType[]) => {
                    const copy = JSON.stringify(oldProducts);
                    const data = JSON.parse(copy);

                    data.splice(productIndex, 1);

                    return data;
                });
            }
        },
        checkout: async () => {
            try {
                setIsPending(true);
                const res = await axios.post(
                    `${process.env.SERVER_URL}/user/checkout`,
                    {
                        cart,
                        total: total,
                    },
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                setIsPending(false);
                // console.log(res.data);
                setSuccess(true);
                window.scrollTo(0, 0);
            } catch (error: any) {
                console.log(error);
                setIsPending(false);

                if (error?.response?.data?.type === 'out_of_stock') {
                    setErrorOutStock(error?.response?.data?.stock);
                }
            }
        },
        order: async () => {
            if (!fullname || !phone || !address)
                return swal(
                    'Error',
                    'Please fill in all the information',
                    'error'
                );

            try {
                const data = {
                    fullname,
                    phone,
                    address,
                    payment,
                    products: cart,
                    total,
                };
                setIsPendingOrder(true);
                await axios.post(
                    `${process.env.SERVER_URL}/user/order`,
                    { data },
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                dispatch(removeCart());
                setIsPendingOrder(false);
                swal({
                    title: 'Success',
                    text: 'Order successfully!',
                    icon: 'success',
                }).then(() => {
                    router.push('/order');
                });
            } catch (error) {
                console.log(error);
                setIsPendingOrder(false);
            }
        },
    };

    useEffect(() => {
        setErrorOutStock([]);
    }, [cart]);

    useEffect(() => {
        if (!user?.user?._id) {
            router.push('/');
        }
    }, [user?.user?._id]);

    useEffect(() => {
        if (success) {
            // scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [success]);

    return (
        <>
            {success && cart && cart.length > 0 && (
                <section className='max-w-[1260px] mx-auto mt-9 mb-[100px] animate-fadeInTop'>
                    <div className='flex items-center gap-1 justify-center w-full'>
                        <i className='fa-solid fa-credit-card text-2xl'></i>
                        <h2 className=' text-2xl font-bold'>Order</h2>
                    </div>

                    <div className='flex gap-16 flex-wrap mt-5'>
                        <div className='w-[calc(70%-32px)] tablet:w-full flex gap-5 flex-wrap'>
                            <div className='w-[calc(60%-10px)] mobile:w-full'>
                                <h2 className='font-medium'>
                                    Delivery information
                                </h2>

                                <div className='form mt-2 flex flex-col gap-2'>
                                    <input
                                        type='text'
                                        className='py-3 px-2 border w-full rounded-md text-sm'
                                        placeholder='First and last name of cosignee'
                                        value={fullname}
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                    />

                                    <input
                                        type='text'
                                        className='py-3 px-2 border w-full rounded-md text-sm'
                                        placeholder='Phone number'
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                    <input
                                        type='text'
                                        className='py-3 px-2 border w-full rounded-md text-sm'
                                        placeholder='Address'
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className='w-[calc(40%-10px)] mobile:w-full'>
                                <h2 className='font-medium'>Payment methods</h2>
                                <div className='mt-2 border p-4 rounded-md'>
                                    <div className='flex items-center gap-1 w-full'>
                                        <input
                                            type='radio'
                                            id='cod'
                                            value='cod'
                                            onChange={(e) => {
                                                setPayment(e.target.value);
                                            }}
                                            checked={payment === 'cod'}
                                            className=' hover:cursor-pointer'
                                        />
                                        <label
                                            htmlFor='cod'
                                            className='mt-[-1px] hover:cursor-pointer text-sm flex items-center justify-between w-full'>
                                            <span>
                                                Payment on delivery (COD)
                                            </span>{' '}
                                            <i className='fa-sharp fa-light fa-money-bill text-sm text-colorPrimary'></i>
                                        </label>
                                    </div>

                                    <div className='flex items-center gap-1 mt-1 w-full'>
                                        <input
                                            type='radio'
                                            id='banking'
                                            value='banking'
                                            onChange={(e) => {
                                                setPayment(e.target.value);
                                            }}
                                            checked={payment === 'banking'}
                                            className=' hover:cursor-pointer'
                                        />
                                        <label
                                            htmlFor='banking'
                                            className='mt-[-1px] hover:cursor-pointer text-sm flex items-center justify-between w-full'>
                                            <span>Banking</span>
                                            <i className='fa-sharp fa-regular fa-building-columns text-sm text-colorPrimary'></i>
                                        </label>
                                    </div>

                                    {payment === 'banking' && (
                                        <div className='text-sm mt-2 bg-slate-50 p-2 rounded animate-modal'>
                                            <p>Test branch, Test branch</p>{' '}
                                            <p>
                                                {' '}
                                                Account number: 0000000000000
                                            </p>
                                            <p> Account owner: Test</p>
                                            <p>
                                                {' '}
                                                (Content of transfer: Name +
                                                Order phone number)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='w-[calc(30%-32px)] tablet:w-full'>
                            <h2 className='font-medium'>
                                Ordering ({cart.length}{' '}
                                {cart.length > 1 ? 'products' : 'product'})
                            </h2>

                            <div className='mt-2'>
                                {cart.map((item: CartType, index: number) => {
                                    return (
                                        <div key={index}>
                                            <div className='mb-1 flex items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <figure className='w-[50px] relative'>
                                                        <Image
                                                            className='w-full h-full object-contain'
                                                            src={
                                                                item.product_image
                                                            }
                                                            alt='product'
                                                            width='0'
                                                            sizes='100vw'
                                                            height='0'
                                                        />
                                                        <span className='w-[15px] h-[15px] flex items-center justify-center bg-colorPrimary text-white text-xs rounded-full absolute top-0 right-0'>
                                                            {
                                                                item.product_quantity
                                                            }
                                                        </span>
                                                    </figure>

                                                    <p className='text-sm flex-1'>
                                                        {item.product_name}
                                                    </p>
                                                </div>

                                                <p className='font-medium text-sm text-colorPrimary'>
                                                    {item.product_price.toLocaleString()}
                                                    ₫
                                                </p>
                                            </div>
                                            <hr className='w-[70%] mx-auto mb-1' />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className='flex items-center justify-between mt-5'>
                                <p>Total</p>
                                <p className='font-medium text-colorPrimaryHover'>
                                    {total.toLocaleString()}₫
                                </p>
                            </div>

                            {isPendingOrder && (
                                <div className='mt-5'>
                                    <LoadingCard
                                        width='27'
                                        height='27'
                                        content='Order in processing...'
                                    />
                                </div>
                            )}

                            <div className=' flex items-center justify-between mt-4'>
                                <div
                                    className='group flex items-center gap-1 hover:cursor-pointer'
                                    onClick={() => setSuccess(false)}>
                                    <i className='fa-regular fa-chevron-left text-sm group-hover:translate-x-[-3px] transition-all duration-300'></i>
                                    <span className='font-medium text-sm group-hover:underline'>
                                        Back to cart
                                    </span>
                                </div>
                                <button
                                    className='px-10 py-3 rounded-md bg-colorPrimary hover:bg-colorPrimaryHover text-white'
                                    onClick={HANDLE.order}>
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section
                className={
                    success
                        ? `max-w-[1260px] mx-auto mt-9 opacity-30`
                        : `max-w-[1260px] mx-auto mt-9`
                }>
                <div className='flex items-center gap-1 justify-center w-full'>
                    <i className='fa-solid fa-cart-shopping text-2xl'></i>
                    <h1 className=' text-2xl font-bold'>Your Cart</h1>
                </div>
                <div className='flex gap-16 flex-wrap mt-5'>
                    {cart && cart?.length > 0 ? (
                        <>
                            <div className='w-[calc(70%-32px)] tablet:w-full'>
                                <div className='flex flex-col gap-5'>
                                    {cart?.map(
                                        (item: CartType, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <div className='flex items-center justify-between flex-wrap mb-5'>
                                                        <div className='flex items-center w-[65%] mobile:w-full'>
                                                            <figure className='w-[80px]'>
                                                                <Image
                                                                    className='w-full h-full object-cover'
                                                                    src={
                                                                        item.product_image
                                                                    }
                                                                    alt='Product img'
                                                                    width='0'
                                                                    height='0'
                                                                    sizes='100vw'
                                                                />
                                                            </figure>

                                                            <h2 className='font-medium'>
                                                                {
                                                                    item.product_name
                                                                }
                                                            </h2>
                                                        </div>

                                                        <div className='flex items-center w-[35%] mobile:mt-2 justify-between mobile:w-full'>
                                                            <div className='flex items-center gap-3'>
                                                                <div className='flex items-center gap-1'>
                                                                    <button
                                                                        className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                                        onClick={() =>
                                                                            HANDLE.decreasingQuantity(
                                                                                item._id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            item.product_quantity <=
                                                                                1 ||
                                                                            isPending ||
                                                                            success
                                                                        }>
                                                                        <i className='fa-solid fa-minus text-sm text-white'></i>
                                                                    </button>
                                                                    <input
                                                                        className=' text-center border border-colorPrimary w-[70px] py-1 text-sm rounded-md'
                                                                        type='number'
                                                                        value={
                                                                            item.product_quantity
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            HANDLE.setQuantity(
                                                                                item._id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            isPending ||
                                                                            success
                                                                        }
                                                                    />
                                                                    <button
                                                                        className='w-[20px] h-[20px] rounded-full flex items-center justify-center bg-colorPrimary hover:bg-colorPrimaryHover disabled:bg-gray-300'
                                                                        onClick={() =>
                                                                            HANDLE.increasingQuantity(
                                                                                item._id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isPending ||
                                                                            success
                                                                        }>
                                                                        <i className='fa-solid fa-plus text-white'></i>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <p className=' font-medium text-colorPrimary'>
                                                                {item.product_price.toLocaleString()}
                                                                ₫
                                                            </p>

                                                            <button
                                                                className='group hover:cursor-pointer'
                                                                onClick={() =>
                                                                    HANDLE.removeProductById(
                                                                        item._id
                                                                    )
                                                                }
                                                                disabled={
                                                                    isPending ||
                                                                    success
                                                                }>
                                                                <i className='fa-solid fa-trash text-gray-600 group-hover:text-colorPrimary'></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {errorOutStock &&
                                                        errorOutStock.length >
                                                            0 &&
                                                        errorOutStock.map(
                                                            (
                                                                error: ErrorResponseProps,
                                                                index: number
                                                            ) => {
                                                                if (
                                                                    error._id ===
                                                                    item.productId
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className='text-red-500'>
                                                                            {
                                                                                error.name
                                                                            }{' '}
                                                                            only
                                                                            have{' '}
                                                                            {
                                                                                error.quantity
                                                                            }{' '}
                                                                            quantity
                                                                            in
                                                                            stock
                                                                        </div>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    <hr />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div className='w-[calc(30%-32px)] tablet:w-full px-3 py-4 mobile:px-0'>
                                {/* <div className='mb-6'>
                                    <p className='text-xs'>
                                        Enter promote code
                                    </p>
                                    <div className='border flex'>
                                        <input
                                            type='text'
                                            className='flex-1 text-sm py-2 px-2 bg-transparent'
                                        />
                                        <button className='w-[30%] bg-black text-sm font-medium text-white '>
                                            Submit
                                        </button>
                                    </div>
                                </div> */}

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
                                                    item.product_quantity *
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
                                        className='py-3 w-full bg-colorPrimary text-white font-medium text-sm hover:bg-colorPrimaryHover rounded-md disabled:bg-slate-300'
                                        onClick={HANDLE.checkout}
                                        disabled={success}>
                                        Check out
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='!w-full flex items-center justify-center flex-col'>
                            <figure className='w-[300px]'>
                                <Image
                                    className='w-full h-full object-cover'
                                    src='https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/icons/cart.svg'
                                    alt='Empty cart'
                                    width='0'
                                    height='0'
                                    sizes='100vw'
                                />
                            </figure>
                            <p className='text-center mt-5 font-semibold text-2xl mb-5'>
                                Your cart is empty.{' '}
                            </p>
                            <Link
                                href='/product'
                                className='font-medium text-colorPrimary border border-colorPrimary py-3 px-4 text-sm rounded-lg hover:bg-colorPrimary hover:text-white transition-all duration-300'>
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

CartPage.displayName = 'CartPage';

export default CartPage;
