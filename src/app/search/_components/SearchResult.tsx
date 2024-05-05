"use client";

import { type Variants, motion } from "framer-motion";
import Poster from "~/app/_components/Poster";
import URLBuilder from "~/models/urlBuilder";
import { type MovieSearchResults } from "~/server/schemas/tmdb";

const searchResultVariants: Variants = {
    initial: {
        y: 100,
        opacity: 0,
        transition: {
            duration: 0.15,
        },
    },
    open: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.15,
        },
    },
    exit: {
        y: 20,
        scale: 0.9,
        opacity: 0,
        transition: {
            duration: 0.1,
        },
    },
};

type SearchResultProps = {
    movie: MovieSearchResults["results"][number];
};

export default function SearchResult({ movie }: SearchResultProps) {
    return (
        <motion.div
            className="h-full w-full shadow-none shadow-black transition-shadow hover:shadow-2xl"
            variants={searchResultVariants}
            key={movie.id}
            layoutId={movie.id.toString()}
        >
            <motion.div
                whileHover="hovering"
                initial="initial"
                className="h-full w-full"
            >
                <motion.div
                    className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl"
                    variants={{
                        initial: {
                            scale: 1,
                            zIndex: 0,
                        },
                        hovering: {
                            scale: 1.1,
                            zIndex: 9999,
                        },
                    }}
                >
                    <Poster
                        altText={movie.title}
                        imageSize="w342"
                        posterPath={movie.poster_path}
                        objectCover
                        href={URLBuilder.getMovieUrl({
                            movieId: movie.id,
                        })}
                    />
                    <motion.div
                        className="pointer-events-none absolute left-0 top-0 z-40 flex h-full w-full bg-black p-2"
                        variants={{
                            initial: {
                                opacity: 0,
                            },
                            hovering: {
                                opacity: 0.7,
                            },
                        }}
                    ></motion.div>
                    <motion.div
                        className="pointer-events-none absolute left-0 top-0 z-50 flex h-full w-full flex-col justify-end border-white/50 p-2"
                        variants={{
                            initial: {
                                y: "100%",
                            },
                            hovering: {
                                y: 0,
                                transition: {
                                    ease: "easeOut",
                                },
                            },
                        }}
                    >
                        <motion.span className="gradient-text text-ellipsis text-lg font-bold">
                            {movie.title}
                        </motion.span>
                        {movie.release_date && (
                            <motion.span className="text-sm text-white ">
                                {new Date(movie.release_date).getFullYear()}
                            </motion.span>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
