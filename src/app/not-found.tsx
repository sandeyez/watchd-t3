"use client";

import Link from "next/link";
import Button from "./_components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function NotFoundPage() {
    return (
        <div className="relative flex h-full w-full flex-col items-center gap-8 p-8 pt-[30vh]">
            <div className="fixed left-0 top-[72px] -z-10 h-full w-full bg-gradient-to-b from-secondary to-tertiary"></div>
            <div className="flex max-w-lg flex-col items-center gap-2 text-center">
                <span className="gradient-text text-4xl font-bold">
                    Oops...
                </span>
                <span>
                    We could not find that page. Go back to the Watchd homepage
                    or try searching for the page you were looking for.
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Link href="/search">
                    <Button variant="secondary" size="icon">
                        <FontAwesomeIcon icon={faSearch} className="size-4" />
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="default">Go back home</Button>
                </Link>
            </div>
        </div>
    );
}
