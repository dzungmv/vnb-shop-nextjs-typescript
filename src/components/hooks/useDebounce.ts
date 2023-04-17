'use client';

import { useState, useEffect } from 'react';


const useDebounce = (value: string | number, milliSeconds: number
) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliSeconds]);

    return debouncedValue;
};

export default useDebounce;