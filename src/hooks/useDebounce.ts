import { useState, useEffect } from "react";

function useDebounce<T>(val: T, delay: number) {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, val]);

    return debounceVal;
}

export default useDebounce;
