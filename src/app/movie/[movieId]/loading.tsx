import { Skeleton } from "~/components/ui/skeleton";
import { MoviePosterSkeleton } from "./_components/MoviePoster/MoviePoster";
import { MovieMetadataSkeleton } from "./_components/MovieMetadata/MovieMetadata";
import { MovieButtonsSkeleton } from "./_components/MovieButtons/MovieButtons";

export default function MovieSkeleton() {
    return (
        <>
            <MoviePosterSkeleton />
            <MovieMetadataSkeleton />
            <MovieButtonsSkeleton />

            {/* Description */}
            <div className="flex w-full flex-col">
                <Skeleton className="mb-2 h-6 w-28" />
                <Skeleton className="h-24 w-full" />
            </div>
        </>
    );
}
