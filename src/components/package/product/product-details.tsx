const product = {
    id: '1',
    name: 'Kawasaki Racket 3307 - White red',
    imgage: 'https://shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-clear-ny-chinh-hang.jpg',
    price: 1000000,
    price_stock: 1200000,
    attributes: {
        code: 'VNB014614',
        branch: 'Kawasaki',
        status: 'In stock',
        endow: [
            'Free 2 Badminton Rackets: VNB 001 , VS002 or Joto 001',
            'Genuine products',
            'Free single bag or velvet cover to protect the racket',
            'Payment after inspection and receipt (Delivery of racket frame)',
            'Genuine warranty according to the manufacturer (Except for domestic and portable goods)',
        ],
        weight: ['3U', '4U', '5U'],
        store: ['VNB District 1'],
        descriptions: {},
    },
};

const ProductDetails: React.FC = () => {
    return <section className=' max-w-[1260px] mx-auto mt-5'>Test</section>;
};

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;
