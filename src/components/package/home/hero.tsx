import Image from 'next/image';
import Link from 'next/link';

const HeroComp = () => {
    return (
        <section className='flex justify-between items-center pt-2 w-full flex-wrap mobile:mt-5'>
            <div className='w-[50%] pl-20 tablet:pl-0 mobile:w-full mobile:text-center'>
                <h1 className=' text-[40px] font-semibold'>
                    Deeply reduce badminton products, <strong>upto 70%</strong>
                </h1>

                <p className='mt-5'>
                    <strong className=''>ShopVNB</strong> is a best place to buy
                    badminton products
                </p>

                <Link className='' href='/product'>
                    <button className='mt-20 mobile:mt-9 py-3 px-6 bg-colorPrimary text-white rounded-md hover:bg-colorPrimaryHover'>
                        Shop now
                    </button>
                </Link>
            </div>
            <figure className='w-[50%] h-[500px] mobile:w-full'>
                <Image
                    className='w-full h-full object-cover'
                    src={
                        'https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/Hero/hero.jpg'
                    }
                    alt='hero'
                    width='0'
                    height='0'
                    sizes='100vw'
                    priority
                />
            </figure>
        </section>
    );
};

HeroComp.displayName = 'HeroComp';

export default HeroComp;
