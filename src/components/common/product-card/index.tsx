import { ProductCard } from '@/components/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard: React.FC<ProductCard> = (props) => {
    const { name, slug, price, imageSrc } = props;

    return (
        <Link href={slug} passHref target='_blank'>
            <article className='border border-transparent hover:border-colorPrimary hover:cursor-pointer transition-all rounded-lg'>
                <figure className='w-full h-[220px]'>
                    <Image
                        className='w-full h-full object-cover rounded-t-lg'
                        src={imageSrc}
                        alt='Product Card'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>
                <div className='mt-4 p-2'>
                    <p>{name}</p>
                    <p className='text-center mt-1 text-colorPrimary font-medium'>{`${price.toLocaleString()} ₫`}</p>
                </div>
            </article>
        </Link>
    );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
