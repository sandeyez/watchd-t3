import { type MovieCredits } from "~/server/schemas/tmdb";
import Image from "next/image";
import { ImageHelper } from "~/models/imageHelper";
import PersonPlaceholder from "~/app/_components/Placeholders/PersonPlaceholder";
import { Skeleton } from "~/components/ui/skeleton";

type MovieCastProps = {
    cast: MovieCredits["cast"];
};

export default function MovieCast({ cast }: MovieCastProps) {
    return (
        <div className="relative order-last col-span-2 w-full sm:block md:order-none md:col-span-1">
            <h2 className="text-lg font-bold">Cast</h2>
            <div className="xs:grid-cols-2 grid grid-cols-1 flex-col gap-2 sm:grid-cols-3 md:flex">
                {cast
                    .slice(0, 8)
                    .map(({ character, id, name, profile_path }) => (
                        <div key={id} className="flex flex-grow gap-2">
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

export function MovieCastSkeleton() {
    return (
        <div className="flex w-full flex-col">
            <Skeleton className="mb-2 h-6 w-16" />
            <div className="flex w-full flex-col gap-2">
                {new Array(8).fill(null).map((_, index) => (
                    <div key={index} className="flex w-full gap-2">
                        <Skeleton className="max-h-12 min-h-12 min-w-12 max-w-12 rounded-full" />
                        <div className="flex w-full flex-col gap-2">
                            <Skeleton className="h-3 w-2/3" />
                            <Skeleton className="h-2 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
