"use client";

import { motion } from "framer-motion";
import Tag from "~/app/_components/Tag";
import { Skeleton } from "~/app/_components/Skeleton";
import { useMovie } from "../../_providers";

export default function MovieMetadata() {
    const { genres, release_date, title, tagline, runtime } = useMovie();

    const releaseDate = release_date ? new Date(release_date) : null;

    return (
        <div className="col-span-2 flex flex-col items-center justify-end text-center text-sm xs:col-span-1 xs:items-start xs:text-start">
            <div className="flex items-center">
                <h1 className="gradient-text text-2xl font-bold md:text-3xl">
                    {title}
                </h1>
            </div>

            {tagline && (
                <span className="font-extralight italic">
                    &quot;{tagline}&quot;
                </span>
            )}
            <div className="flex w-fit items-center gap-2">
                {releaseDate ? (
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
                            {releaseDate.toLocaleString("en-US", {
                                month: "long",
                            })}
                        </motion.span>
                        <span className="h-fit">
                            {releaseDate.getFullYear()}
                        </span>
                    </motion.div>
                ) : null}
                {releaseDate && runtime ? <span> • </span> : null}
                {runtime && runtime > 0 ? <span>{runtime} min</span> : null}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 xs:justify-start">
                {genres.slice(0, 3).map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                ))}
            </div>
        </div>
    );
}

export function MovieMetadataSkeleton() {
    return (
        <div className="col-span-2 flex flex-col items-center justify-end gap-2 xs:col-span-1 xs:items-start xs:text-start">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-64" />
        </div>
    );
}
