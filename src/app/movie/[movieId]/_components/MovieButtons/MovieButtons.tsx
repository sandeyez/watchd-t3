// type MovieButtonsProps = {}

import { faEarth, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export default function MovieButtons() {
    return (
        <div className="col-span-2 flex flex-row-reverse justify-between gap-2 md:col-span-1 md:flex-col md:justify-end">
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
                <Button size="icon" variant="outline" className="aspect-square">
                    <FontAwesomeIcon icon={faEarth} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export function MovieButtonsSkeleton() {
    return (
        <div className="flex flex-col justify-end gap-4">
            <Skeleton className="flex h-10 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
}
