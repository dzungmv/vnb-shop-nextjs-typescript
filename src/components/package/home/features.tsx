'use client';

import Image from 'next/image';
import Link from 'next/link';

const FeaturesComp = () => {
    return (
        <section className=' max-w-[1200px] mx-auto grid grid-cols-3 grid-rows-[250px_50px_250px] gap-5 tablet:gap-3 mt-28 mobile:grid-cols-1 mobile:grid-rows-[250px_250px_250px_250px_250px]'>
            <div className=' col-span-1 row-span-3 rounded-lg bg-colorPrimary onlyTablet:col-span-2 onlyTablet:row-span-1 mobile:col-span-1 mobile:row-span-1 flex items-center justify-center relative border border-dashed border-white'>
                <article className='flex items-center justify-center flex-col'>
                    <h2 className='text-[48px] font-semibold text-white'>
                        VNB's partners
                    </h2>
                    <p className='max-w-[250px] text-center text-white font-medium text-lg'>
                        VNB is proud to be a partner of the following brands.
                    </p>
                </article>

                <div className=' absolute bottom-3 flex items-center gap-1'>
                    <Link
                        href={''}
                        className='w-9 h-9 flex items-center justify-center rounded-full'>
                        <i className='fa-brands fa-facebook text-white text-2xl'></i>
                    </Link>
                    <Link
                        href={''}
                        className='w-9 h-9 flex items-center justify-center rounded-full'>
                        <i className='fa-brands fa-youtube text-white text-2xl'></i>
                    </Link>
                </div>

                <div className=' absolute w-full h-full'></div>
            </div>

            <div className=' col-span-1 row-span-2 rounded-lg mobile:col-span-1 mobile:row-span-1 p-4 flex flex-col justify-between shadow-f'>
                <figure className='w-[100px]'>
                    <Image
                        className='w-full tablet:w-[80px]'
                        src={'/Logo-Yonex.png'}
                        alt='yonex'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>

                <article>
                    <Link href='https://www.yonex.com/'>
                        <h2 className='group text-[20px] font-medium mb-2 hover:cursor-pointer flex items-center gap-1'>
                            <span>Yonex</span>{' '}
                            <i className=' text-xs text-gray-400 fa-regular fa-arrow-up-right group-hover:translate-x-1 group-hover:translate-y-[-3px] transition-all duration-300'></i>
                        </h2>
                    </Link>
                    <p className='text-gray-500 text-start  text-color'>
                        Yonex Co., Ltd. is a Japanese sports equipment
                        manufacturing company. Yonex produces equipment and
                        apparel for tennis, badminton, golf, and running.{' '}
                        <span className=' tablet:hidden'>
                            Its range of products manufactured and
                            commercialised includes equipment for badminton and
                            tennis and golf.
                        </span>
                    </p>
                </article>
            </div>
            <div className='col-span-1 row-span-1 rounded-lg mobile:col-span-1 mobile:row-span-1 onlyTablet:row-span-2  p-4 flex flex-col justify-between shadow-s'>
                <figure className='w-[100px] tablet:w-[85px]'>
                    <Image
                        className='w-full'
                        src={'/kawasaki.png'}
                        alt='yonex'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>

                <article>
                    <Link href='https://www.kawasakijp.com/'>
                        <h2 className='group text-[20px] font-medium mb-2 hover:cursor-pointer flex items-center gap-1'>
                            <span>Kawasaki</span>{' '}
                            <i className=' text-xs text-gray-400 fa-regular fa-arrow-up-right group-hover:translate-x-1 group-hover:translate-y-[-3px] transition-all duration-300'></i>
                        </h2>
                    </Link>
                    <p className='text-gray-500 text-start  text-color'>
                        KAWASAKI Badminton was founded in 1915 in Japan, and
                        created world first carbon racket in 1983 named
                    </p>
                </article>
            </div>
            <div className='col-span-1 row-span-2 rounded-lg mobile:col-span-1 mobile:row-span-1 p-4 flex flex-col justify-between shadow-t'>
                <figure className='w-[100px]'>
                    <Image
                        className='w-full mt-[-10px] ml-[-12px] tablet:w-[80px]'
                        src={'/lining.png'}
                        alt='lining'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>

                <article>
                    <Link href='https://en.lining.com/'>
                        <h2 className='group text-[20px] font-medium mb-2 hover:cursor-pointer flex items-center gap-1'>
                            <span>Lining</span>{' '}
                            <i className=' text-xs text-gray-400 fa-regular fa-arrow-up-right group-hover:translate-x-1 group-hover:translate-y-[-3px] transition-all duration-300'></i>
                        </h2>
                    </Link>
                    <p className='text-gray-500 text-start  text-color'>
                        Li-Ning Company Limited is a Chinese sportswear and
                        sports equipment company founded by former Olympic
                        gymnast Li Ning.{' '}
                        <span className=' tablet:hidden'>
                            The company endorses a number of athletes and teams
                            worldwide
                        </span>
                    </p>
                </article>
            </div>
            <div className=' rounded-lg mobile:col-span-1 mobile:row-span-1 p-4 flex flex-col justify-between shadow-fo'>
                <figure className='w-[60px] tablet:w-[40px]'>
                    <Image
                        className='w-full'
                        src={'/adidas.png'}
                        alt='adidas'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>

                <article>
                    <Link href='https://www.adidas.com.vn/'>
                        <h2 className='group text-[20px] font-medium mb-2 hover:cursor-pointer flex items-center gap-1'>
                            <span>Adidas</span>{' '}
                            <i className=' text-xs text-gray-400 fa-regular fa-arrow-up-right group-hover:translate-x-1 group-hover:translate-y-[-3px] transition-all duration-300'></i>
                        </h2>
                    </Link>
                    <p className='text-gray-500 text-start  text-color'>
                        Adidas AG is a German multinational corporation, founded
                        and headquartered in Herzogenaurach, Bavaria.
                    </p>
                </article>
            </div>
        </section>
    );
};

FeaturesComp.displayName = 'FeaturesComp';

export default FeaturesComp;
