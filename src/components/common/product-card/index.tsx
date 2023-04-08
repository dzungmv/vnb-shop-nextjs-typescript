import { ProductCard } from '@/components/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard: React.FC<ProductCard> = (props) => {
    const { name, slug, price, imageSrc } = props;

    return (
        <Link href={`/product/${slug}`} passHref>
            <article className='group hover:cursor-pointer rounded-lg border border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col justify-between items-center h-[300px]'>
                <div className='h-[70%]'>
                    <figure className='w-full h-full'>
                        <Image
                            className='w-full h-full object-contain rounded-t-lg group-hover:opacity-[0.7] transition-all duration-200'
                            src={imageSrc}
                            alt='Product Card'
                            width='0'
                            height='0'
                            sizes='100vw'
                        />
                    </figure>

                    <div className='text-center group-hover:text-colorPrimary transition-all duration-200 mt-2 px-1'>
                        {name}
                    </div>
                </div>
                <p className='text-center group-hover:text-colorPrimary transition-all duration-200 px-1 pb-1 font-medium text-colorPrimary'>
                    {price.toLocaleString()}₫
                </p>
            </article>
        </Link>
    );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
