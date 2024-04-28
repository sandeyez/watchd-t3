import { type Movie, type MovieRecommendations } from "~/server/schemas/tmdb";
import ScrollableMovieList from "../ScrollableMovieList/ScrollableMovieList";

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
