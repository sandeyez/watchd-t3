import { faEarth, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import PersonPlaceholder from "~/app/_components/Placeholders/PersonPlaceholder";
import { Button } from "~/components/ui/button";
import TMDB from "~/server/models/tmdb";
import { type Movie, type MovieCredits } from "~/server/schemas/tmdb";
import MovieMetadata from "./_components/MovieMetadata/MovieMetadata";
import MoviePoster from "./_components/MoviePoster/MoviePoster";
import ScrollableMovieList from "./_components/ScrollableMovieList/ScrollableMovieList";
import { ImageHelper } from "~/server/models/imageHelper";
// import { useRef } from "react";

type MovieBackdropProps = {
    backdropPath: Movie["backdrop_path"];
};

function MovieBackdrop({ backdropPath }: MovieBackdropProps) {
    return (
        <div className="pointer-events-none fixed left-0 top-0 -z-[1000] h-[50vh] w-full">
            <div className="absolute -z-20 h-full w-full overflow-hidden">
                <div className="h-full w-full blur-[2px]">
                    <Image
                        src={ImageHelper.getImageUrl({
                            type: "backdrop",
                            path: backdropPath,
                            size: "w1280",
                        })}
                        alt=""
                        layout="fill"
                        className="object-cover"
                        priority
                        placeholder="blur"
                        blurDataURL={ImageHelper.getImageUrl({
                            type: "backdrop",
                            path: backdropPath,
                            size: "w300",
                        })}
                    />
                </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-primary/70 to-secondary" />
        </div>
    );
}

// type MovieButtonsProps = {}

function MovieButtons() {
    return (
        <div className="flex flex-col justify-end gap-2">
            <Button variant="default">Check-in</Button>
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

type MovieCastProps = {
    cast: MovieCredits["cast"];
};

function MovieCast({ cast }: MovieCastProps) {
    return (
        <div>
            <h2 className="text-lg font-bold">Cast</h2>
            <div className="flex flex-col gap-2">
                {cast
                    .slice(0, 8)
                    .map(({ character, id, name, profile_path }) => (
                        <div key={id} className="flex gap-2">
                            <div className="max-h-12 min-h-12 min-w-12 max-w-12 overflow-hidden rounded-full">
                                {profile_path ? (
                                    <Image
                                        src={ImageHelper.getImageUrl({
                                            path: profile_path,
                                            type: "profile",
                                            size: "w185",
                                        })}
                                        alt={name ?? ""}
                                        width={128}
                                        height={192}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <PersonPlaceholder className="h-full w-full" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="line-clamp-2 text-ellipsis text-sm font-bold">
                                    {name}
                                </span>
                                <span className="line-clamp-2 text-ellipsis text-xs">
                                    {character}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

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

    // const middleContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <MovieBackdrop backdropPath={movie.backdrop_path} />
            <MoviePoster
                posterPath={movie.poster_path}
                altText={`${movie.title} poster`}
                imageSize="w780"
                allowFlip
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
            <div className="flex max-w-full flex-col gap-8">
                <article>
                    <h2 className="text-lg font-bold">Description</h2>
                    <p className="text-justify text-sm">{movie.overview}</p>
                </article>

                <article>
                    <h2 className="text-lg font-bold">Recommended movies</h2>
                    <ScrollableMovieList
                        results={recommendations.results.filter(
                            ({ media_type }) => media_type === "movie",
                        )}
                    />
                </article>
            </div>
        </>
    );
}
