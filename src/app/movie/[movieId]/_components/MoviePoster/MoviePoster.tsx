"use client";

import Image from "next/image";
import Poster from "~/app/_components/Poster";
import { Skeleton } from "~/components/ui/skeleton";
import { ImageHelper } from "~/models/imageHelper";
import { formatCurrency } from "~/utils/format";
import { useMovie, useMovieCredits } from "../../_providers";
import "./MoviePoster.css";

export default function MoviePoster() {
    const {
        title,
        budget,
        revenue,
        production_companies: productionCompanies,
        poster_path: posterPath,
    } = useMovie();

    const productionCompany = productionCompanies.sort(
        (a, b) => a.id - b.id,
    )[0];

    const { crew } = useMovieCredits();

    const directorName = crew.find(({ job }) => job === "directorName")?.name;

    return (
        <div className="col-span-2 flex aspect-[3/2] w-full justify-center xs:col-span-1 xs:aspect-[2/3] xs:max-h-none">
            <div className="movie-poster aspect-[2/3] h-full">
                <div className="movie-poster__inner relative h-full w-full rounded-lg">
                    <div className="movie-poster__front h-full w-full">
                        <Poster
                            altText={`${title} poster`}
                            posterPath={posterPath}
                            imageSize="w780"
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
        <div className="col-span-2 flex aspect-[3/2] w-full justify-center xs:col-span-1 xs:aspect-[2/3] xs:max-h-none">
            <Skeleton className="aspect-[2/3]" />
        </div>
    );
}
