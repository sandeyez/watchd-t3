// type MovieButtonsProps = {}

import { faEarth, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { type Movie } from "~/server/schemas/tmdb";

type MovieButtonsProps = {
    homepage: Movie["homepage"];
};

export default function MovieButtons({ homepage }: MovieButtonsProps) {
    return (
        <div className="col-span-2 flex flex-row justify-between gap-2 md:col-span-1 md:flex-col md:justify-end">
            <Button variant="default" className="max-h-10 max-w-40 flex-grow">
                Check-in
            </Button>
            <div className="flex justify-end gap-2">
                <Button size="icon" variant="outline" className="aspect-square">
                    <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="aspect-square">
                    <FontAwesomeIcon icon={faShare} className="h-4 w-4" />
                </Button>
                {homepage && (
                    <Link href={homepage} target="_blank">
                        <Button
                            size="icon"
                            variant="outline"
                            className="aspect-square"
                        >
                            <FontAwesomeIcon
                                icon={faEarth}
                                className="h-4 w-4"
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
