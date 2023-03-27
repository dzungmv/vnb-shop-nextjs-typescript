import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='mt-28'>
            <section className=' max-w-[1260px] mx-auto flex gap-5'>
                <div className='w-[calc(40%-15px)]'>
                    <h2 className=' text-[18px] font-medium text-gray-600 mb-3'>
                        General Information
                    </h2>
                    <p className='text-sm mb-2'>
                        <strong>VNB Sports</strong> is a system of badminton
                        stores with more than 50 branches nationwide, providing
                        wholesale and retail of badminton equipment from
                        movement to professional.
                    </p>
                    <p className='text-sm mb-2'>
                        <strong>Mission:</strong> "VNB is committed to bringing
                        the best quality products and services to sports players
                        to improve their own health."
                    </p>

                    <p className='text-[14px]'>
                        <strong>Vision:</strong> "Become a distributor and
                        Vietnam's largest sports producer"
                    </p>
                </div>

                <div className='w-[calc(100%/4)]'>
                    <h2 className=' text-[18px] font-medium text-gray-600 mb-3'>
                        Contact Informations
                    </h2>
                    <p className='text-sm mb-2'>
                        <strong>Hotline:</strong> 1900 636 636
                    </p>
                    <p className='text-sm mb-2'>
                        <strong>Email:</strong> info@gmail.com
                    </p>

                    <p className='text-[14px]'>
                        <strong>Franchise:</strong> 1900 636 636
                    </p>

                    <div className='flex items-center gap-2 mt-3'>
                        <Link
                            href={'https://www.facebook.com/VNBSports'}
                            className='w-[35px] h-[35px] border rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-bgGray'
                            target='_blank'>
                            <i className='fa-brands fa-facebook text-[#4267B2]'></i>
                        </Link>
                        <Link
                            href={'https://www.youtube.com/@congdongvnb'}
                            className='w-[35px] h-[35px] border rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-bgGray'
                            target='_blank'>
                            <i className='fa-brands fa-youtube text-[#FF0000]'></i>
                        </Link>
                    </div>
                </div>

                <div className='w-[calc(100%/4)]'>
                    <h2 className=' text-[18px] font-medium text-gray-600 mb-3'>
                        Policy
                    </h2>
                    <Link href={'/'} className='text-sm mb-2'>
                        Return Policy & Exchange
                    </Link>{' '}
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Warranty Policy
                    </Link>{' '}
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Shipping Policy
                    </Link>
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Term of Use
                    </Link>
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Privacy Policy
                    </Link>
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Franchise policy
                    </Link>
                </div>

                <div className='w-[calc(100%/4)]'>
                    <h2 className=' text-[18px] font-medium text-gray-600 mb-3'>
                        Guides
                    </h2>
                    <Link href={'/'} className='text-sm mb-2'>
                        Guide to choosing a racquet for beginners
                    </Link>{' '}
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Guide to payment methods
                    </Link>{' '}
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Check warranty status
                    </Link>
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Check order status
                    </Link>
                    <br />
                    <Link href={'/'} className='text-sm mb-2'>
                        Shopping guide
                    </Link>
                </div>
            </section>
        </footer>
    );
};

Footer.displayName = 'Footer';

export default Footer;