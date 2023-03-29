const FeaturesComp = () => {
    return (
        <section className='grid grid-cols-3 grid-rows-[300px_100px_300px] gap-5 mt-28 mobile:grid-cols-1 mobile:grid-rows-[250px_250px_250px_250px_250px]'>
            <div className=' bg-black col-span-1 row-span-3 rounded-lg mobile:col-span-1 mobile:row-span-1'></div>
            <div className='bg-purple-50 col-span-1 row-span-2 rounded-lg mobile:col-span-1 mobile:row-span-1'></div>
            <div className='bg-red-700 col-span-1 row-span-1 rounded-lg mobile:col-span-1 mobile:row-span-1'></div>
            <div className=' bg-stone-500 col-span-1 row-span-2 rounded-lg mobile:col-span-1 mobile:row-span-1'></div>
            <div className='bg-[pink] rounded-lg mobile:col-span-1 mobile:row-span-1'></div>
        </section>
    );
};

FeaturesComp.displayName = 'FeaturesComp';

export default FeaturesComp;
