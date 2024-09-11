"use client";

import { faEarth, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Button from "~/app/_components/Button";
import { Skeleton } from "~/components/ui/skeleton";
import { useMovie } from "../../_providers";
import CheckInButton from "./_components/CheckInButton";
import WatchlistButton from "./_components/WatchlistButton";
import { useSession } from "next-auth/react";

type MovieButtonsProps = {
    isAddedToWatchlist: boolean;
};

export default function MovieButtons({
    isAddedToWatchlist,
}: MovieButtonsProps) {
    const { homepage } = useMovie();
    const { status } = useSession();

    return (
        <div className="col-span-2 flex flex-row justify-between gap-2 md:col-span-1 md:flex-col md:justify-end">
            <CheckInButton />
            <div className="flex justify-end gap-2">
                {status === "authenticated" && (
                    <WatchlistButton isAddedToWatchlist={isAddedToWatchlist} />
                )}
                <Button size="icon" variant="outline" tooltip="Share movie">
                    <FontAwesomeIcon icon={faShare} className="h-5 w-5" />
                </Button>
                {homepage && (
                    <Link href={homepage} target="_blank">
                        <Button
                            size="icon"
                            variant="outline"
                            tooltip="Visit movie homepage"
                        >
                            <FontAwesomeIcon
                                icon={faEarth}
                                className="h-5 w-5"
                            />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export function MovieButtonsSkeleton() {
    return (
        <div className="col-span-2 flex flex-row justify-between gap-2 md:col-span-1 md:flex-col md:justify-end">
            <Skeleton className="max-h-10 w-full flex-grow" />
            <div className="flex justify-end gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
}
