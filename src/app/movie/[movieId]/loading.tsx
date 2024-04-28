import { MovieButtonsSkeleton } from "./_components/MovieButtons/MovieButtons";
import { MovieCastSkeleton } from "./_components/MovieCast/MovieCast";
import { MovieMetadataSkeleton } from "./_components/MovieMetadata/MovieMetadata";
import { MovieOverviewSkeleton } from "./_components/MovieOverview/MovieOverview";
import { MoviePosterSkeleton } from "./_components/MoviePoster/MoviePoster";

export default function MovieSkeleton() {
    return (
        <>
            <MoviePosterSkeleton />
            <MovieMetadataSkeleton />
            <MovieButtonsSkeleton />

            <MovieCastSkeleton />
            <MovieOverviewSkeleton />
        </>
    );
}
