'use client';

import { FilterItem } from '@/components/types';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';

import filterUI from '@/components/data/filter.json';
import ProductCard from '@/components/common/product-card';

const RacketComp: React.FC = () => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <section className=' max-w-[1260px] mx-auto mt-5 flex gap-5'>
            <div className='w-[23%] rounded-lg border p-3'>
                <div className=' pb-4'>
                    <h2 className=' font-medium mb-2 text-lg text-gray-600'>
                        {filterUI.price.name}
                    </h2>
                    <div className='flex flex-col gap-2'>
                        {filterUI.price.values.map((item: FilterItem) => {
                            return (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='under500'
                                        value={item.value}
                                    />
                                    <label
                                        htmlFor='under500'
                                        className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                        {item.title}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr />

                <div className=' py-4'>
                    <h2 className=' font-medium mb-2 text-lg text-gray-600'>
                        {filterUI.branch.name}
                    </h2>
                    <div className='flex flex-col gap-2'>
                        {filterUI.branch.values.map((item: FilterItem) => {
                            return (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='under500'
                                        value={item.value}
                                    />
                                    <label
                                        htmlFor='under500'
                                        className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                        {item.title}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <hr />

                <div className=' py-4'>
                    <h2 className=' font-medium mb-2 text-lg text-gray-600'>
                        {filterUI.weight.name}
                    </h2>
                    <div className='flex flex-col gap-2'>
                        {filterUI.weight.values.map((item: FilterItem) => {
                            return (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='under500'
                                        value={item.value}
                                    />
                                    <label
                                        htmlFor='under500'
                                        className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                        {item.title}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr />
                <div className=' py-4'>
                    <h2 className=' font-medium mb-2 text-lg text-gray-600'>
                        {filterUI.agency.name}
                    </h2>
                    <div className='flex flex-col gap-2'>
                        {filterUI.agency.values.map((item: FilterItem) => {
                            return (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='under500'
                                        value={item.value}
                                    />
                                    <label
                                        htmlFor='under500'
                                        className='text-sm hover:text-colorPrimary hover:cursor-pointer'>
                                        {item.title}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className='w-[77%]'>
                <header className='flex items-center justify-between'>
                    <h2 className=' font-medium text-xl'>Racket</h2>
                    <div className='flex gap-2 items-center text-sm'>
                        <div>
                            <i className='fa-solid fa-bars-sort'></i>
                            <span className='ml-1 text-gray-500'>Sort:</span>
                        </div>

                        <Tippy
                            content={
                                <section className='w-[200px]'>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        A-Z
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        Z-A
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        Price increasing
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        Price decreasing
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        Oldest product
                                    </div>
                                    <div className='p-2 hover:bg-gray-200 hover:cursor-pointer'>
                                        Newest product
                                    </div>
                                </section>
                            }
                            arrow={false}
                            interactive
                            theme='light'
                            placement='bottom'>
                            <div
                                className='group hover:cursor-pointer'
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}>
                                Default{' '}
                                <i
                                    className={
                                        isHover
                                            ? 'fa-regular fa-chevron-up transition-all'
                                            : 'fa-regular fa-chevron-down transition-all'
                                    }></i>
                            </div>
                        </Tippy>
                    </div>
                </header>

                <div className='flex flex-wrap gap-3 mt-3'>
                    <div className='w-[calc(100%/4-9px)]'>
                        <ProductCard
                            id='1'
                            name='Vicleo Power 7000'
                            slug='vicleo-power-7000'
                            price={2000000}
                            imageSrc='https://shopvnb.com/uploads/gallery/vot-cau-long-vicleo-power-7000-chinh-hang.jpg'
                        />
                    </div>
                    <div className='w-[calc(100%/4-9px)]'>
                        <ProductCard
                            id='1'
                            name='Vicleo Power 7000'
                            slug='vicleo-power-7000'
                            price={2000000}
                            imageSrc='https://shopvnb.com/uploads/gallery/vot-cau-long-vicleo-power-7000-chinh-hang.jpg'
                        />
                    </div>
                    <div className='w-[calc(100%/4-9px)]'>
                        <ProductCard
                            id='1'
                            name='Vicleo Power 7000'
                            slug='vicleo-power-7000'
                            price={2000000}
                            imageSrc='https://shopvnb.com/uploads/gallery/vot-cau-long-vicleo-power-7000-chinh-hang.jpg'
                        />
                    </div>
                    <div className='w-[calc(100%/4-9px)]'>
                        <ProductCard
                            id='1'
                            name='Vicleo Power 7000'
                            slug='vicleo-power-7000'
                            price={2000000}
                            imageSrc='https://shopvnb.com/uploads/gallery/vot-cau-long-vicleo-power-7000-chinh-hang.jpg'
                        />
                    </div>
                    <div className='w-[calc(100%/4-9px)]'>
                        <ProductCard
                            id='1'
                            name='Vicleo Power 7000'
                            slug='vicleo-power-7000'
                            price={2000000}
                            imageSrc='https://shopvnb.com/uploads/gallery/vot-cau-long-vicleo-power-7000-chinh-hang.jpg'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

RacketComp.displayName = 'RacketComp';

export default RacketComp;
