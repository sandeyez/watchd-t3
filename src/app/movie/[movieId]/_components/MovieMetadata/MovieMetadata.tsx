"use client";

import { motion } from "framer-motion";
import Tag from "~/app/_components/Tag/Tag";
import { Skeleton } from "~/components/ui/skeleton";
import { type Movie } from "~/server/schemas/tmdb";

type MovieMetadataProps = {
    title: Movie["title"];
    tagline: Movie["tagline"];
    releaseDate: Date;
    genres: Movie["genres"];
};

export default function MovieMetadata({
    genres,
    releaseDate,
    title,
    tagline,
}: MovieMetadataProps) {
    return (
        <div className="xs:col-span-1 xs:items-start col-span-2 flex flex-col items-center justify-end text-sm">
            <div className="flex items-center">
                <h1 className="gradient-text text-3xl font-bold">{title}</h1>
            </div>

            {tagline && (
                <span className="font-extralight italic">
                    &quot;{tagline}&quot;
                </span>
            )}
            <motion.div
                className="group flex w-fit"
                initial="initial"
                animate="initial"
                whileHover="animate"
            >
                <motion.span
                    variants={{
                        initial: {
                            width: 0,
                            paddingRight: 0,
                        },
                        animate: {
                            width: "fit-content",
                            paddingRight: 4,
                        },
                    }}
                    className="overflow-hidden text-nowrap group-hover:w-fit"
                >
                    {releaseDate.getDate()}{" "}
                    {releaseDate.toLocaleString("en-US", { month: "long" })}
                </motion.span>
                <span className="h-fit">{releaseDate.getFullYear()}</span>
            </motion.div>

            <div className="flex items-center gap-2 pt-2">
                {genres.slice(0, 3).map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                ))}
            </div>
        </div>
    );
}

export function MovieMetadataSkeleton() {
    return (
        <div className="flex flex-col justify-end gap-2">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-64" />
        </div>
    );
}
