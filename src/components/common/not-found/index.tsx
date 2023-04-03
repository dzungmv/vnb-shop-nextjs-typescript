'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import animation from '@/components/data/animation.json';
import Link from 'next/link';

type Props = {
    title?: string;
};

const NotFoundPage: React.FC = ({ title }: Props) => {
    return (
        <section className=' max-w-[1200px] mx-auto w-full flex items-center'>
            <div className='w-[40%] text-right mr-[-64px] z-10 mobile:hidden'>
                <h2 className=' text-5xl font-medium'>Opps, 404!</h2>

                <p className=' my-6 text-lg text-medium'>
                    {title ?? 'Not found product'}
                </p>

                <Link
                    href={'/'}
                    className='py-3 px-6 border border-colorPrimary text-colorPrimary rounded-lg hover:cursor-pointer hover:bg-colorPrimary hover:text-white'>
                    Back home
                </Link>
            </div>
            <div className='w-[60%] mobile:w-full'>
                {animation && (
                    <Player
                        autoplay
                        loop
                        src={animation}
                        style={{ height: '500px', width: '100%' }}
                    />
                )}
                <div className='text-center hidden mobile:block'>
                    <Link
                        href={'/'}
                        className='py-3 px-6 border border-colorPrimary text-colorPrimary rounded-lg hover:cursor-pointer hover:bg-colorPrimary hover:text-white'>
                        Back home
                    </Link>
                </div>
            </div>
        </section>
    );
};

NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
