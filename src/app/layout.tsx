import { Providers } from '@/components/redux/provider';
import '../components/styles/globals.css';

export const metadata = {
    metadataBase: new URL('https://vnb-shop.netlify.app/'),

    title: 'ShopVNB',
    description:
        'VNB Sports is a badminton store system with more than 50 branches nationwide, providing wholesale and retail badminton equipment from movement to professional.',
    images: ['thumbnail.jpeg'],
    icons: {
        icon: 'icon.png',
    },
    robots: {
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },

        nocache: true,
        follow: true,
    },
    twitter: {
        card: 'summary_large_image',
        site: '@shopvnb',
        creator: '@shopvnb',
        title: 'ShopVNB - Badminton Store System',
        description:
            'VNB Sports is a badminton store system with more than 50 branches nationwide, providing wholesale and retail badminton equipment from movement to professional.',
        images: [
            'https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/thumbnail.jpeg',
        ],
    },
    facebook: {
        card: 'summary_large_image',
        site: '@shopvnb',
        creator: '@shopvnb',
        title: 'ShopVNB - Badminton Store System',
        description:
            'VNB Sports is a badminton store system with more than 50 branches nationwide, providing wholesale and retail badminton equipment from movement to professional.',
        images: [
            'https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/thumbnail.jpeg',
        ],
    },
    other: {
        facebook: {
            card: 'summary_large_image',
            site: '@shopvnb',
            creator: '@shopvnb',
            title: 'ShopVNB - Badminton Store System',
            description:
                'VNB Sports is a badminton store system with more than 50 branches nationwide, providing wholesale and retail badminton equipment from movement to professional.',
            images: [
                'https://jungjung261.blob.core.windows.net/nextjs-project/VNB_SHOP/thumbnail.jpeg',
            ],
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                {' '}
                <link
                    rel='stylesheet'
                    href='https://site-assets.fontawesome.com/releases/v6.1.2/css/all.css?fbclid=IwAR2Lefv1ZTLJsKEsnl4HGMf5XRZuPqx5yOFnFaOFbVgCiCeU87S0up6ptKU'
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
