"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import MoviePoster from "../MoviePoster/MoviePoster";

type ScrollableMovieListProps = {
    results: Array<{
        id: number;
        title: string;
        poster_path: string | null;
    }>;
};

function ScrollableMovieList({
    results,
}: ScrollableMovieListProps): JSX.Element {
    const scrollPercentage = useMotionValue(0);
    const overlayOpacity = useTransform(
        scrollPercentage,
        [0, 85, 100],
        [1, 1, 0],
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

        const maxScroll = scrollWidth - clientWidth;
        const percentage = (scrollLeft / maxScroll) * 100;

        scrollPercentage.set(percentage);
    };

    return (
        <div className="relative min-h-48">
            <div
                className="absolute h-full w-full overflow-x-scroll"
                onScroll={handleScroll}
            >
                <div className="flex h-full gap-2 py-2">
                    {results.map(({ id, title, poster_path }) => (
                        <motion.div
                            key={id}
                            className="aspect-[2/3] h-full flex-grow"
                        >
                            <MoviePoster
                                posterPath={poster_path}
                                allowFlip={false}
                                imageSize="w342"
                                altText={`${title} poster`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-secondary/0 via-secondary/0 to-secondary/100"
            />
        </div>
    );
}

export default ScrollableMovieList;
