"use client";

import Link from "next/link";
import Button from "./_components/Button";

export default function ErrorPage({
    reset,
}: {
    reset: () => void;
}): JSX.Element {
    return (
        <div className="relative flex h-full w-full flex-col items-center gap-8 p-8 pt-[30vh]">
            <div className="animate-fadeIn fixed left-0 top-[72px] -z-10 h-full w-full bg-gradient-to-b from-secondary to-tertiary"></div>
            <div className="flex max-w-lg flex-col items-center gap-2 text-center">
                <span className="gradient-text text-4xl font-bold">
                    Oops...
                </span>
                <span>
                    Something went wrong on our end. Please try again or return
                    to the Watchd homepage.
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={reset}>
                    Try again
                </Button>
                <Link href="/">
                    <Button variant="default">Go back home</Button>
                </Link>
            </div>
        </div>
    );
}
