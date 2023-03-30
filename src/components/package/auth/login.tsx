import Image from 'next/image';
import Link from 'next/link';

const LoginComp: React.FC = () => {
    return (
        <main className='flex items-center justify-center h-[100vh] w-full'>
            <section className='flex w-[75%] h-[75%] items-center'>
                <figure className='w-[64%] h-full'>
                    <Image
                        className=' w-full h-full object-cover'
                        src={'/badminton.webp'}
                        alt='badminton'
                        width='0'
                        height='0'
                        sizes='100vw'
                    />
                </figure>
                <section className='w-[38%] flex flex-col gap-3 border rounded-lg shadow-xl p-4'>
                    <div className=' border rounded-lg px-3'>
                        <input
                            className=' py-4 bg-transparent w-full'
                            type='text'
                            placeholder='Email'
                        />
                    </div>

                    <div className=' border rounded-lg px-3'>
                        <input
                            className=' py-4 bg-transparent w-full'
                            type='password'
                            placeholder='Password'
                        />
                    </div>

                    <button className='py-3 text-white font-medium rounded-lg bg-colorPrimary text-lg hover:bg-colorPrimaryHover mb-1'>
                        Login
                    </button>

                    <Link
                        href='/identify'
                        className=' text-center text-colorPrimary font-medium text-sm hover:underline'>
                        Forgot password?
                    </Link>

                    <hr />

                    <div className='bg-[#00FF00]'>Create a new account</div>
                </section>
            </section>
        </main>
    );
};

LoginComp.displayName = 'LoginComp';
export default LoginComp;
