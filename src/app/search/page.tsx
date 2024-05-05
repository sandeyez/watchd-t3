/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { cn } from "~/lib/utils";
import URLBuilder from "~/models/urlBuilder";
import { getSearchResults } from "~/server/actions/searchMoviesAction";
import { type MovieSearchResults } from "~/server/schemas/tmdb";
import Poster from "../_components/Poster";
import Searchbar from "./_components/Searchbar";

const childVariants: Variants = {
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
        y: 100,
        opacity: 0,
        transition: {
            duration: 0.1,
        },
    },
};

const parentVariants: Variants = {
    initial: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    open: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: 1,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export default function Search() {
    const [searchQuery, setSearchQuery] = useState(
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("query") ?? ""
            : "",
    );
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const [userHasSearched, setUserHasSearched] = useState(false);

    const [searchResults, setSearchResults] = useState<
        MovieSearchResults["results"]
    >([]);

    useEffect(() => {
        // Set the URL search params to the search query
        const url = new URL(window.location.href);
        url.searchParams.set("query", debouncedSearchQuery);
        window.history.pushState(null, "", url.toString());

        if (debouncedSearchQuery.length === 0) {
            setSearchResults([]);

            return;
        }

        void getSearchResults(debouncedSearchQuery).then(({ results }) => {
            setSearchResults(results);
        });
    }, [debouncedSearchQuery]);

    function handleChangeSearchQuery(query: string) {
        setSearchQuery(query);
        setUserHasSearched(true);
    }
    return (
        <main className="h-full w-full">
            {searchQuery.length === 0 && !userHasSearched ? (
                <motion.div
                    className={cn(
                        "mx-auto flex h-full w-full flex-col items-center justify-center gap-4 text-center",
                        {
                            "h-fit items-start justify-start":
                                searchQuery.length > 0,
                        },
                    )}
                    layout
                >
                    <AnimatePresence mode="wait">
                        {searchQuery.length === 0 && (
                            <>
                                <motion.span
                                    className="gradient-text max-w-screen-sm text-3xl font-bold"
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    Start typing to search through millions of
                                    movies, TV shows, and people.
                                </motion.span>
                                <Searchbar
                                    value={searchQuery}
                                    onChange={handleChangeSearchQuery}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col gap-4">
                    <Searchbar
                        value={searchQuery}
                        onChange={handleChangeSearchQuery}
                    />
                    <motion.div
                        className="grid grid-cols-6 gap-4"
                        initial="initial"
                        animate="open"
                        exit="initial"
                        variants={parentVariants}
                        layout
                        key={JSON.stringify(searchResults)}
                    >
                        {searchResults.map((movie) => (
                            <motion.div
                                className="h-full w-full"
                                variants={childVariants}
                                whileHover={{ scale: 1.1 }}
                                key={movie.id}
                                layoutId={movie.id.toString()}
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
        </main>
    );
}
