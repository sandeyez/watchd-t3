import { type Movie, type MovieRecommendations } from "~/server/schemas/tmdb";
import ScrollableMovieList from "../ScrollableMovieList/ScrollableMovieList";
import { Skeleton } from "~/components/ui/skeleton";

type MovieOverviewProps = {
    overview: Movie["overview"];
    recommendations: MovieRecommendations["results"];
};

export default function MovieOverview({
    overview,
    recommendations,
}: MovieOverviewProps): JSX.Element {
    return (
        <div className="col-span-2 flex max-w-full flex-col gap-8 lg:col-span-1">
            <article>
                <h2 className="text-lg font-bold">Description</h2>
                <p className="text-justify text-sm">{overview}</p>
            </article>

            <article>
                <h2 className="text-lg font-bold">Recommended movies</h2>
                <ScrollableMovieList
                    results={recommendations.filter(
                        ({ media_type }) => media_type === "movie",
                    )}
                    allowClick
                />
            </article>
        </div>
    );
}

export function MovieOverviewSkeleton() {
    return (
        <div className="col-span-2 flex w-full flex-col gap-8 lg:col-span-1">
            <div className="w-full">
                <Skeleton className="mb-2 h-6 w-28" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="relative min-h-56 w-full">
                <div className="mb-2 flex h-6 gap-2">
                    <Skeleton className="h-full w-32" />
                    <Skeleton className="h-full w-20" />
                </div>
                <div className="absolute flex h-44 w-full gap-2 overflow-hidden py-2">
                    {new Array(6).fill(null).map((_, index) => (
                        <Skeleton key={index} className="aspect-[2/3] h-44" />
                    ))}
                </div>
            </div>
        </div>
    );
}
