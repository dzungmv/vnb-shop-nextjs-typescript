import { useState } from 'react';

type Props = {
    changeState: (state: boolean) => void | undefined;
};

const SearchComp: React.FC<Props> = ({ changeState }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
        <div className='w-full h-[80%]  flex-1 relative flex'>
            <div
                className='mr-2 w-10 h-10 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-slate-100'
                onClick={() => changeState(false)}>
                <i className='fa-regular fa-arrow-left text-lg text-gray-600'></i>
            </div>
            <div className=' w-full h-full bg-bgGray rounded-[20px] flex items-center gap-2'>
                <i className='fa-regular fa-magnifying-glass text-gray-500 ml-3'></i>
                <input
                    className=' bg-transparent py-px10 w-full text-sm  placeholder:text-gray-500'
                    type='text'
                    placeholder='Search product...'
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            <div className=' absolute top-[-5px] z-[-1] w-[101%] left-[50%] rounded-b-lg translate-x-[-50%] max-h-[50vh] bg-white shadow-2xl l-0 r-0 pt-14 px-1'>
                {searchValue && searchValue.length > 0 ? (
                    <p>Hehe</p>
                ) : (
                    <p className=' text-sm text-gray-500 text-center py-2'>
                        No recent searches
                    </p>
                )}
            </div>
        </div>
    );
};

SearchComp.displayName = 'SearchComp';
export default SearchComp;
