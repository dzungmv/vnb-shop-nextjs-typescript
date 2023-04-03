'use client';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <section className='max-w-[1200px] mx-auto h-[75vh] flex items-center justify-center'>
            <div className='flex justify-center flex-col items-center'>
                <h2 className=' text-2xl font-semibold'>
                    Opps, Some thing went wrong!
                </h2>
                <button
                    className='mt-3 px-6 py-2 text-sm text-colorPrimary border border-colorPrimary rounded-md hover:bg-colorPrimary hover:text-white'
                    onClick={() => reset()}>
                    Reload
                </button>
            </div>
        </section>
    );
}
