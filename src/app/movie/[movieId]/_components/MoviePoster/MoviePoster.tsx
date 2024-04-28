import Image from "next/image";
import Poster from "~/app/_components/Poster/Poster";
import { ImageHelper, type TMDBImageSizes } from "~/models/imageHelper";
import { type Movie } from "~/server/schemas/tmdb";
import { formatCurrency } from "~/utils/format";
import "./MoviePoster.css";
import { Skeleton } from "~/components/ui/skeleton";

type MoviePosterProps = {
    posterPath: Movie["poster_path"];
    altText: string;
    imageSize: TMDBImageSizes["poster"];
    budget: Movie["budget"];
    revenue: Movie["revenue"];
    directorName: string | undefined;
    productionCompany: Movie["production_companies"][number] | undefined;
};

export default function MoviePoster({
    altText,
    budget,
    directorName,
    imageSize,
    posterPath,
    productionCompany,
    revenue,
}: MoviePosterProps) {
    return (
        <div className="xs:col-span-1 xs:max-h-none xs:aspect-[2/3] col-span-2 flex aspect-video w-full justify-center">
            <div className="movie-poster aspect-[2/3] h-full">
                <div className="movie-poster__inner relative h-full w-full rounded-lg">
                    <div className="movie-poster__front">
                        <Poster
                            altText={altText}
                            posterPath={posterPath}
                            imageSize={imageSize}
                        />
                    </div>
                    <div className="movie-poster__back h-full w-full overflow-hidden rounded-lg">
                        <div className="flex h-full w-full flex-col justify-between gap-2 bg-primary p-4">
                            <div className="flex flex-col gap-2 text-xs">
                                {[
                                    directorName
                                        ? {
                                              title: "Director",
                                              value: directorName,
                                          }
                                        : undefined,
                                    productionCompany
                                        ? {
                                              title: "Production company",
                                              value: productionCompany?.name,
                                          }
                                        : undefined,
                                    budget > 0
                                        ? {
                                              title: "Budget",
                                              value: formatCurrency(budget),
                                          }
                                        : undefined,
                                    revenue > 0
                                        ? {
                                              title: "Revenue",
                                              value: formatCurrency(revenue),
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
                            {productionCompany?.logo_path && (
                                <div className="mx-auto hidden h-32 w-full items-center justify-center rounded-md bg-white p-2 md:flex">
                                    <div className="relative h-16 w-full">
                                        <Image
                                            src={ImageHelper.getImageUrl({
                                                path:
                                                    productionCompany?.logo_path ??
                                                    "",
                                                size: "w300",
                                                type: "logo",
                                            })}
                                            alt={productionCompany?.name ?? ""}
                                            layout="fill"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MoviePosterSkeleton(): JSX.Element {
    return (
        <div>
            <Skeleton className="aspect-[2/3] w-full" />
        </div>
    );
}
