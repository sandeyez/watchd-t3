"use client";

import { motion } from "framer-motion";
import Tag from "~/app/_components/Tag/Tag";

type MovieMetadataProps = {
    title: string;
    tagline: string;
    releaseDate: Date;
    genres: { id: number; name: string }[];
};

export default function MovieMetadata({
    genres,
    releaseDate,
    title,
    tagline,
}: MovieMetadataProps) {
    return (
        <div className="flex flex-col justify-end text-sm">
            <div className="flex items-center">
                <h1 className="gradient-text text-3xl font-bold">{title}</h1>
            </div>

            <span className="font-extralight italic">
                &quot;{tagline}&quot;
            </span>
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
