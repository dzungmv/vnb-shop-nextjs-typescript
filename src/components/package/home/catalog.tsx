import Link from 'next/link';

import { CatalogItem } from '@/components/types';
import catalogData from '@/components/data/catalog.json';
import Image from 'next/image';

const CatalogComp = () => {
    return (
        <section className='mt-28 max-w-[1200px] mx-auto'>
            <header className='flex justify-center items-center text-center w-full'>
                <h1 className='text-[30px] font-medium text-center max-w-[600px]'>
                    Find your suitable badminton equipment easy in VNB shop
                </h1>
            </header>

            <div className='flex flex-wrap mt-12 gap-5'>
                {catalogData.map((item: CatalogItem) => {
                    return (
                        <Link
                            key={item.id}
                            className={
                                'group w-[calc(100%/4-15px)] h-[200px] rounded-lg relative overflow-hidden flex items-center justify-center transition-all hover:bg-[rgba(0,0,0,0.7)] hover:cursor-pointer'
                            }
                            href={`/product/${item.href}`}>
                            <Image
                                className='w-full h-full object-cover rounded-lg z-[-1]'
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                width='0'
                                height='0'
                                sizes='100vw'
                            />

                            <div className='absolute text-white font-medium text-lg animate-fadeUp hidden group-hover:block z-1'>
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

CatalogComp.displayName = 'ProductListComp';

export default CatalogComp;
