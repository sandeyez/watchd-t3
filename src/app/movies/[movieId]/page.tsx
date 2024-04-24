import { faEarth, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import TMDB from "~/server/models/tmdb";
import { formatCurrency } from "~/utils/format";
import MovieMetadata from "./_components/MovieMetadata";

type MovieBackdropProps = {
    backdropPath: string;
};

function MovieBackdrop({ backdropPath }: MovieBackdropProps) {
    return (
        <div className="pointer-events-none absolute left-0 top-0 h-96 w-full">
            <div className="absolute -z-20 h-full w-full overflow-hidden">
                <div className=" h-full w-full blur-[2px]">
                    <Image
                        src={TMDB.getImageUrl({
                            type: "backdrop",
                            path: backdropPath,
                            size: "w1280",
                        })}
                        alt=""
                        layout="fill"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-primary/70 to-secondary" />
        </div>
    );
}

type MoviePosterProps = {
    posterPath: string;
    altText: string;
    budget: number;
    revenue: number;
    director: string | undefined;
    productionCompany:
        | {
              name: string;
              logo_path: string | null;
          }
        | undefined;
};

function MoviePoster({
    altText,
    director,
    posterPath,
    budget,
    revenue,
    productionCompany,
}: MoviePosterProps) {
    return (
        <div className="movie-poster aspect-[2/3] overflow-hidden">
            <div className="movie-poster__inner relative h-full w-full rounded-lg">
                <Image
                    src={TMDB.getImageUrl({
                        path: posterPath,
                        type: "poster",
                        size: "w342",
                    })}
                    alt={altText}
                    width={228}
                    height={342}
                    className="movie-poster__front h-full w-full rounded-lg object-contain"
                    priority
                />
                <div className="movie-poster__back h-full w-full overflow-hidden rounded-lg">
                    <div className="flex h-full w-full flex-col justify-between gap-2 bg-primary p-4">
                        <div className="mx-auto hidden h-32 w-full items-center justify-center rounded-md bg-white p-2 md:flex">
                            <div className="relative h-16 w-full">
                                <Image
                                    src={TMDB.getImageUrl({
                                        path:
                                            productionCompany?.logo_path ?? "",
                                        size: "w185",
                                        type: "logo",
                                    })}
                                    alt={productionCompany?.name ?? ""}
                                    layout="fill"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 text-xs">
                            {[
                                {
                                    title: "Director",
                                    value: director,
                                },
                                {
                                    title: "Production company",
                                    value: productionCompany?.name,
                                },
                                {
                                    title: "Budget",
                                    value: formatCurrency(budget),
                                },
                                {
                                    title: "Revenue",
                                    value: formatCurrency(revenue),
                                },
                            ].map(({ title, value }) => (
                                <div key={title} className="flex flex-col">
                                    <span className=" font-bold">{title}</span>
                                    <span className="">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// type MovieButtonsProps = {}

function MovieButtons() {
    return (
        <div className="flex flex-col justify-end gap-2">
            <Button variant="default">Check-in</Button>
            <div className="flex justify-between gap-2">
                <Button variant="secondary" className="aspect-square">
                    <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
                </Button>
                <Button variant="secondary" className="aspect-square">
                    <FontAwesomeIcon icon={faShare} className="h-4 w-4" />
                </Button>
                <Button variant="secondary" className="aspect-square">
                    <FontAwesomeIcon icon={faEarth} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

type MovieCastProps = {
    cast: Awaited<ReturnType<typeof TMDB.getMovieCredits>>["cast"];
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
                            {profile_path && (
                                <div className="max-h-12 min-h-12 min-w-12 max-w-12 overflow-hidden rounded-full">
                                    <Image
                                        src={TMDB.getImageUrl({
                                            path: profile_path,
                                            type: "profile",
                                            size: "w185",
                                        })}
                                        alt={name ?? ""}
                                        width={128}
                                        height={192}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
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

export default async function MoviePage({
    params,
}: {
    params: { movieId: string };
}) {
    const movie = await TMDB.getMovie({ movieId: params.movieId });
    const credits = await TMDB.getMovieCredits({ movieId: params.movieId });

    return (
        <>
            <MovieBackdrop backdropPath={movie.backdrop_path} />
            <MoviePoster
                posterPath={movie.poster_path}
                altText={`${movie.title} poster`}
                budget={movie.budget}
                revenue={movie.revenue}
                productionCompany={
                    movie.production_companies.sort((a, b) => a.id - b.id)[0]
                }
                director={
                    credits.crew.find(({ job }) => job === "Director")?.name
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
            <div>
                <h2 className="text-lg font-bold">Description</h2>
                <p className="text-justify text-sm">{movie.overview}</p>
            </div>
        </>
    );
}
