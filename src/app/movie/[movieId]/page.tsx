import { type Metadata, type ResolvingMetadata } from "next";
import { ImageHelper } from "~/models/imageHelper";
import TMDB from "~/models/tmdb";
import MovieBackdrop from "./_components/MovieBackdrop/MovieBackdrop";
import MovieButtons from "./_components/MovieButtons/MovieButtons";
import MovieCast from "./_components/MovieCast/MovieCast";
import MovieMetadata from "./_components/MovieMetadata/MovieMetadata";
import MovieOverview from "./_components/MovieOverview/MovieOverview";
import MoviePoster from "./_components/MoviePoster/MoviePoster";

export async function generateMetadata(
    { params }: { params: { movieId: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { movieId } = params;

    const movie = await TMDB.getMovie({ movieId });

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images ?? [];

    return {
        title: movie.title,
        openGraph: {
            images:
                movie.backdrop_path && movie.poster_path
                    ? [
                          ImageHelper.getImageUrl({
                              type: "backdrop",
                              size: "w780",
                              path: movie.backdrop_path,
                          }),
                          ImageHelper.getImageUrl({
                              type: "poster",
                              size: "w780",
                              path: movie.poster_path,
                          }),
                          ...previousImages,
                      ]
                    : previousImages,
        },
    };
}

export default async function MoviePage({
    params,
}: {
    params: { movieId: string };
}) {
    const movie = await TMDB.getMovie({ movieId: params.movieId });
    const credits = await TMDB.getMovieCredits({ movieId: params.movieId });
    const recommendations = await TMDB.getRecommendedMovies({
        movieId: params.movieId,
    });

    return (
        <>
            <MovieBackdrop backdropPath={movie.backdrop_path} />
            <MoviePoster
                posterPath={movie.poster_path}
                altText={`${movie.title} poster`}
                imageSize="w780"
                budget={movie.budget}
                revenue={movie.revenue}
                productionCompany={
                    movie.production_companies.sort((a, b) => a.id - b.id)[0]
                }
                directorName={
                    credits.crew.find(({ job }) => job === "directorName")?.name
                }
            />
            <MovieMetadata
                title={movie.title}
                tagline={movie.tagline}
                releaseDate={new Date(movie.release_date)}
                genres={movie.genres}
            />
            <MovieButtons />

            <MovieCast cast={credits.cast} />
            <MovieOverview
                overview={movie.overview}
                recommendations={recommendations.results}
            />
        </>
    );
}
