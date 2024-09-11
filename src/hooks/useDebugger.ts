import { useEffect } from "react";

export default function useDebugger(value: unknown) {
    useEffect(() => {
        console.log(value);
    }, [value]);
}
