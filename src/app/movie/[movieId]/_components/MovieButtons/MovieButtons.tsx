// type MovieButtonsProps = {}

import { faEarth, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { type Movie } from "~/server/schemas/tmdb";
import WatchlistButton from "./_components/WatchlistButton";
import { isMovieInWatchlist } from "~/server/db/queries";
import Button from "~/app/_components/Button/Button";

type MovieButtonsProps = {
    homepage: Movie["homepage"];
    movieId: Movie["id"];
};

export default async function MovieButtons({
    homepage,
    movieId,
}: MovieButtonsProps) {
    const isAddedToWatchlist = await isMovieInWatchlist({ movieId });

    return (
        <div className="col-span-2 flex flex-row justify-between gap-2 md:col-span-1 md:flex-col md:justify-end">
            <Button variant="default" className="max-h-10 max-w-40 flex-grow">
                Check-in
            </Button>
            <div className="flex justify-end gap-2">
                <WatchlistButton
                    movieId={movieId}
                    isAddedToWatchlist={isAddedToWatchlist}
                />
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
            <Skeleton className="max-h-10 max-w-40 flex-grow" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
}
