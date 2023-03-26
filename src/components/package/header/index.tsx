import Image from 'next/image';
import Link from 'next/link';

type SubNavTypes = {
    name: string;
    href?: string;
    items?: {
        name: string;
        href: string;
    };
};

interface NavTypes {
    id: number;
    name: string;
    href?: string;
    icon?: {
        chevronUp: string;
        chevronDown: string;
    };
    subnavs?: SubNavTypes[];
}

const navs = [
    {
        id: 1,
        name: 'Home',
        href: '/',
    },
    {
        id: 2,
        name: 'Products',
        icon: {
            chevronUp: 'fa-solid fa-chevron-up',
            chevronDown: 'fa-solid fa-chevron-down',
        },
        subnavs: [
            {
                name: 'Badminton Racket',
                items: [
                    {
                        name: 'Yonex Racket',
                        href: '#',
                    },
                    {
                        name: 'Victor Racket',
                        href: '#',
                    },
                    {
                        name: 'Lining Racket',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Racket',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Shoes',
                items: [
                    {
                        name: 'Yonex Shoes',
                        href: '#',
                    },
                    {
                        name: 'Victor Shoes',
                        href: '#',
                    },
                    {
                        name: 'Lining Shoes',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Shoes',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Shirt',
                items: [
                    {
                        name: 'Yonex Shirt',
                        href: '#',
                    },
                    {
                        name: 'Victor Shirt',
                        href: '#',
                    },
                    {
                        name: 'Lining Shirt',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Shirt',
                        href: '#',
                    },
                ],
            },
            {
                name: 'Badminton Skirt',
                items: [
                    {
                        name: 'Yonex Skirt',
                        href: '#',
                    },
                    {
                        name: 'Victor Skirt',
                        href: '#',
                    },
                    {
                        name: 'Lining Skirt',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Skirt',
                        href: '#',
                    },
                ],
            },

            {
                name: 'Badminton Pants',
                items: [
                    {
                        name: 'Yonex Paints',
                        href: '#',
                    },
                    {
                        name: 'Victor Paints',
                        href: '#',
                    },
                    {
                        name: 'Lining Paints',
                        href: '#',
                    },
                    {
                        name: 'Mizuno Paints',
                        href: '#',
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: 'Sale off',
        href: 'sale-off',
    },
    {
        id: 4,
        name: 'Badminton News',
        href: 'badminton-news',
    },
    {
        id: 5,
        name: 'Franchise Policy',
        href: 'franchise-policy',
    },
    {
        id: 6,
        name: 'Guide',
        subnavs: [
            {
                name: 'Payment Guide',
                href: 'payment-guide',
            },
            {
                name: 'Buying Guide',
                href: 'buying-guide',
            },
            {
                name: 'How to buy a badminton racket',
                href: 'how-to-buy-a-badminton-racket',
            },
        ],
    },
    {
        id: 7,
        name: 'About Us',
        href: 'about-us',
    },
    {
        id: 8,
        name: 'Contact',
        href: 'contact',
    },
];

const Header = () => {
    return (
        <header className='pt-2'>
            <div className=' flex items-center justify-between max-w-[1260px] mx-auto w-full h-[50px]'>
                <div className='flex items-center gap-4 h-full'>
                    <figure className=' w-[50px] h-full'>
                        <Image
                            className='w-full h-full object-cover'
                            src={'/icon.png'}
                            alt='ShopVNB'
                            width='0'
                            height='0'
                            sizes='100vw'
                            priority
                        />
                    </figure>

                    <div className='w-[300px] h-[70%] bg-bgGray rounded-[20px] flex items-center gap-2 px-3'>
                        <i className='fa-regular fa-magnifying-glass text-gray-500 '></i>
                        <input
                            className=' bg-transparent h-full w-full text-sm  placeholder:text-gray-500'
                            type='text'
                            placeholder='Search product...'
                        />
                    </div>
                </div>

                <div className=' flex-1 flex items-center justify-end gap-4'>
                    <div className='flex items-center gap-1'>
                        <i className='fa-solid fa-user-headset text-colorPrimary'></i>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm'>Hotline:</p>
                            <address className='text-colorPrimary text-sm font-medium'>
                                1900 636 636
                            </address>
                        </div>
                    </div>

                    <div className='w-[1px] h-[25px] bg-black'></div>

                    <div className='flex items-center gap-1'>
                        <i className='fa-solid fa-location-arrow text-colorPrimary'></i>
                        <div className='flex items-center gap-1'>
                            <Link href={'#!'} className=' text-sm'>
                                Stores system
                            </Link>
                        </div>
                    </div>

                    <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                        <i className='fa-solid fa-user text-colorPrimary group-hover:text-white'></i>
                    </div>
                    <div className='group w-[40px] h-[40px] rounded-full border border-colorPrimary flex items-center justify-center hover:cursor-pointer hover:bg-colorPrimary transition-all ease-in duration-[0.3s]'>
                        <i className='fa-solid fa-cart-shopping text-colorPrimary group-hover:text-white'></i>
                    </div>
                </div>
            </div>

            <nav className=' max-w-[1200px] mx-auto mt-3 flex items-center justify-between'>
                {navs.map((nav: NavTypes) => {
                    return <div key={nav.id}>{nav.name}</div>;
                })}
            </nav>
        </header>
    );
};

Header.displayName = 'Header';

export default Header;
