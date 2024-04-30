import { useContext } from "react";

export function toggleBodyScrolling(allowScrolling: boolean) {
    document.body.classList.toggle("no-scroll", !allowScrolling);
}

export function useContextSafely<T>(context: React.Context<T>) {
    const value = useContext(context);

    if (value === null || value === undefined) {
        throw new Error("useContext must be inside a Provider with a value");
    }
    return value;
}
