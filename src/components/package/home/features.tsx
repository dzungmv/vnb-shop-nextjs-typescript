const FeaturesComp = () => {
    return (
        <section className='grid grid-cols-3 grid-rows-[300px_100px_300px] gap-5 mt-28'>
            <div className=' bg-black col-span-1 row-span-3 rounded-lg'></div>
            <div className='bg-purple-50 col-span-1 row-span-2 rounded-lg'></div>
            <div className='bg-red-700 col-span-1 row-span-1 rounded-lg'></div>
            <div className=' bg-stone-500 col-span-1 row-span-2 rounded-lg'></div>
            <div className='bg-[pink] rounded-lg'></div>
        </section>
    );
};

FeaturesComp.displayName = 'FeaturesComp';

export default FeaturesComp;
