"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Poster from "~/app/_components/Poster";
import URLBuilder from "~/models/urlBuilder";

type ScrollableMovieListProps = {
    results: Array<{
        id: number;
        title: string;
        poster_path: string | null;
    }>;
    allowClick?: boolean;
};

function ScrollableMovieList({
    results,
    allowClick,
}: ScrollableMovieListProps): JSX.Element {
    const scrollPercentage = useMotionValue(0);
    const rightOverlayOpacity = useTransform(
        scrollPercentage,
        [0, 85, 100],
        [1, 1, 0],
    );
    const leftOverlayOpacity = useTransform(
        scrollPercentage,
        [0, 15, 100],
        [0, 1, 1],
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

        const maxScroll = scrollWidth - clientWidth;
        const percentage = (scrollLeft / maxScroll) * 100;

        scrollPercentage.set(percentage);
    };

    const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

    return (
        <div className="relative min-h-48">
            <div className=" flex h-full w-full ">
                <div
                    className="absolute flex h-full w-full snap-x gap-2 overflow-x-scroll py-2"
                    onScroll={handleScroll}
                >
                    {results.map(({ id, title, poster_path }) => (
                        <motion.div
                            key={id}
                            className="aspect-[2/3] h-full flex-grow snap-start"
                            onMouseEnter={() => setHoveredMovieId(id)}
                            onMouseLeave={() => setHoveredMovieId(null)}
                            initial={{
                                scale: 1,
                                filter: "grayscale(0%)",
                            }}
                            animate={{
                                scale: hoveredMovieId === id ? 1.08 : 1,
                                filter:
                                    hoveredMovieId === null ||
                                    hoveredMovieId === id
                                        ? "grayscale(0%)"
                                        : "grayscale(100%)",
                            }}
                        >
                            <Poster
                                posterPath={poster_path}
                                imageSize="w342"
                                altText={`${title} poster`}
                                href={
                                    allowClick
                                        ? URLBuilder.getMovieUrl({
                                              movieId: id,
                                          })
                                        : undefined
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div
                style={{ opacity: rightOverlayOpacity }}
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-secondary/0 via-secondary/0 to-secondary/100"
            />
            <motion.div
                style={{ opacity: leftOverlayOpacity }}
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-secondary/100 via-secondary/0 to-secondary/0"
            />
        </div>
    );
}

export default ScrollableMovieList;
