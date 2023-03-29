import Link from 'next/link';

const SubHeaderComp = () => {
    return (
        <section className='py-1 bg-colorPrimary tablet:px-4 laptop:px-4'>
            <div className='max-w-[1260px] mx-auto flex items-center justify-between'>
                <div></div>
                <div className='flex items-center  gap-3'>
                    <div className='flex items-center gap-1'>
                        <i className='fa-solid fa-user-headset text-white'></i>
                        <div className='flex items-center gap-1'>
                            <Link
                                href={'tel:1900636636'}
                                className='text-white text-sm font-medium'>
                                1900 636 636
                            </Link>
                        </div>
                    </div>
                    <div className='w-[1px] h-[20px] bg-gray-400'></div>
                    <div className='flex items-center gap-1'>
                        <i className='fa-solid fa-location-arrow text-white'></i>
                        <div className='flex items-center gap-1'>
                            <Link
                                href={'#!'}
                                className='text-white text-sm font-medium'>
                                Stores system
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

SubHeaderComp.displayName = 'SubHeaderComp';

export default SubHeaderComp;
