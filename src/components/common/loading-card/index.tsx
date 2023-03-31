type LoadingCardTypes = {
    width: string;
    height: string;
    content: string;
};

const LoadingCard: React.FC<LoadingCardTypes> = ({
    width,
    height,
    content,
}) => {
    return (
        <div className=' flex items-center p-2 gap-3 bg-[#fcebf1] rounded-md'>
            <span
                className={`w-[${width}px] h-[${height}px] rounded-full inline-block border-t-[2px] border-t-colorPrimary border-r-[2px] border-r-transparent animate-rotate`}></span>
            <p className='text-center text-sm'>{content}</p>
        </div>
    );
};
LoadingCard.displayName = 'LoadingCard';
export default LoadingCard;
