const BenefitComp = () => {
    return (
        <section className='flex items-center gap-3 max-w-[1200px] mx-auto mt-28'>
            <div className='w-[calc(100%/4)] flex items-center justify-center gap-4 border border-colorPrimary p-2 rounded-lg'>
                <i className='fa-solid fa-truck-fast text-2xl text-colorPrimary'></i>
                <div>
                    <h3 className='font-medium text-colorPrimary'>
                        Nationwide shipping
                    </h3>
                    <p className='text-sm  text-gray-500'>
                        Payment on delivery
                    </p>
                </div>
            </div>
            <div className='w-[calc(100%/4)] flex items-center justify-center gap-4 border border-colorPrimary p-2 rounded-lg'>
                <i className='fa-sharp fa-solid fa-chart-line text-2xl text-colorPrimary'></i>
                <div>
                    <h3 className='font-medium text-colorPrimary'>
                        Quality assurance
                    </h3>
                    <p className='text-sm  text-gray-500'>
                        100% original products
                    </p>
                </div>
            </div>

            <div className='w-[calc(100%/4)] flex items-center justify-center gap-4 border border-colorPrimary p-2 rounded-lg'>
                <i className='fa-solid fa-credit-card text-2xl text-colorPrimary'></i>
                <div>
                    <h3 className='font-medium text-colorPrimary'>Payment</h3>
                    <p className='text-sm  text-gray-500'>
                        More than 10 payment methods
                    </p>
                </div>
            </div>

            <div className='w-[calc(100%/4)] flex items-center justify-center gap-4 border border-colorPrimary p-2 rounded-lg'>
                <i className='fa-solid fa-coins text-2xl text-colorPrimary'></i>
                <div>
                    <h3 className='font-medium text-colorPrimary'>
                        Product return{' '}
                    </h3>
                    <p className='text-sm  text-gray-500'>
                        Return new products if errors
                    </p>
                </div>
            </div>
        </section>
    );
};

BenefitComp.displayName = 'BenefitComp';

export default BenefitComp;