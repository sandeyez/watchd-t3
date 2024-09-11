import { useContext } from "react";

function preventDefault(event: Event) {
    event.preventDefault();
}

function preventDefaultScrollKeys(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
    }
}

function disableScrolling() {
    document.body.addEventListener("wheel", preventDefault, { passive: false });
    document.body.addEventListener("touchmove", preventDefault, {
        passive: false,
    });
    document.body.addEventListener("keydown", preventDefaultScrollKeys, {
        passive: false,
    });
}

function enableScrolling() {
    document.body.removeEventListener("wheel", preventDefault);
    document.body.removeEventListener("touchmove", preventDefault);
    document.body.removeEventListener("keydown", preventDefaultScrollKeys);
}

export function toggleBodyScrolling(allowScrolling: boolean) {
    if (allowScrolling) {
        enableScrolling();
        return;
    }

    disableScrolling();
    // document.body.classList.toggle("no-scroll", !allowScrolling);
}

export function useContextSafely<T>(context: React.Context<T>) {
    const value = useContext(context);

    if (value === null || value === undefined) {
        throw new Error("useContext must be inside a Provider with a value");
    }
    return value;
}
