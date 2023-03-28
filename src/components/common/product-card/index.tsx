import { ProductCard } from '@/components/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard: React.FC<ProductCard> = (props) => {
    const { name, slug, price, imageSrc } = props;

    return (
        <Link href={`/product/${slug}`} passHref>
            <article className='group hover:cursor-pointer rounded-lg border border-transparent hover:border-gray-200 transition-all duration-200'>
                <figure className='w-full h-[220px]'>
                    <Image
                        className='w-full h-full object-cover rounded-t-lg group-hover:opacity-[0.7] transition-all duration-200'
                        src={imageSrc}
                        alt='Product Card'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>
                <div className='mt-4 p-2'>
                    <p className='text-center group-hover:text-colorPrimary transition-all duration-200'>
                        {name}
                    </p>
                    <p className='text-center mt-1 text-colorPrimary font-medium'>{`${price.toLocaleString()}₫`}</p>
                </div>
            </article>
        </Link>
    );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
