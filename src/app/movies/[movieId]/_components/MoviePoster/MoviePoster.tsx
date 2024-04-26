import { type Movie } from "~/server/schemas/tmdb";
import Image from "next/image";
import TMDB, { type TMDBImageSizes } from "~/server/models/tmdb";
import { formatCurrency } from "~/utils/format";
import "./MoviePoster.css";
import clsx from "clsx";

type MoviePosterProps = {
    posterPath: Movie["poster_path"];
    altText: string;
    imageSize: TMDBImageSizes["poster"];
} & (
    | {
          allowFlip?: true;
          budget: Movie["budget"];
          revenue: Movie["revenue"];
          directorName: string | undefined;
          productionCompany: Movie["production_companies"][number] | undefined;
      }
    | {
          allowFlip?: false;
      }
);

export default function MoviePoster(props: MoviePosterProps) {
    const { posterPath, altText, imageSize, allowFlip: allowFlipProp } = props;

    const allowFlip =
        allowFlipProp &&
        (props.directorName !== undefined ||
            props.productionCompany !== undefined ||
            props.budget > 0 ||
            props.revenue > 0);

    return (
        <div
            className={clsx(`movie-poster aspect-[2/3]`, {
                "movie-poster--flip": allowFlip,
            })}
        >
            <div className="movie-poster__inner relative h-full w-full rounded-lg">
                <div className="movie-poster__front h-full w-full rounded-lg object-cover">
                    {posterPath && (
                        <Image
                            src={TMDB.getImageUrl({
                                path: posterPath,
                                type: "poster",
                                size: imageSize,
                            })}
                            alt={altText}
                            width={228}
                            height={342}
                            priority
                            placeholder="blur"
                            blurDataURL={TMDB.getImageUrl({
                                path: posterPath,
                                type: "poster",
                                size: "w92",
                            })}
                        />
                    )}
                </div>
                {allowFlip && (
                    <div className="movie-poster__back h-full w-full overflow-hidden rounded-lg">
                        <div className="flex h-full w-full flex-col justify-between gap-2 bg-primary p-4">
                            <div className="flex flex-col gap-2 text-xs">
                                {[
                                    props.directorName
                                        ? {
                                              title: "Director",
                                              value: props.directorName,
                                          }
                                        : undefined,
                                    props.productionCompany
                                        ? {
                                              title: "Production company",
                                              value: props.productionCompany
                                                  ?.name,
                                          }
                                        : undefined,
                                    props.budget > 0
                                        ? {
                                              title: "Budget",
                                              value: formatCurrency(
                                                  props.budget,
                                              ),
                                          }
                                        : undefined,
                                    props.revenue > 0
                                        ? {
                                              title: "Revenue",
                                              value: formatCurrency(
                                                  props.revenue,
                                              ),
                                          }
                                        : undefined,
                                ].map(
                                    (stat) =>
                                        stat && (
                                            <div
                                                key={stat.title}
                                                className="flex flex-col"
                                            >
                                                <span className=" font-bold">
                                                    {stat.title}
                                                </span>
                                                <span className="">
                                                    {stat.value}
                                                </span>
                                            </div>
                                        ),
                                )}
                            </div>
                            {props.productionCompany?.logo_path && (
                                <div className="mx-auto hidden h-32 w-full items-center justify-center rounded-md bg-white p-2 md:flex">
                                    <div className="relative h-16 w-full">
                                        <Image
                                            src={TMDB.getImageUrl({
                                                path:
                                                    props.productionCompany
                                                        ?.logo_path ?? "",
                                                size: "w300",
                                                type: "logo",
                                            })}
                                            alt={
                                                props.productionCompany?.name ??
                                                ""
                                            }
                                            layout="fill"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
