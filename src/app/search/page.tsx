/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import useIsClient from "~/hooks/useIsClient";
import { cn } from "~/lib/utils";
import { getSearchResults } from "~/server/actions/searchMoviesAction";
import { type MovieSearchResults } from "~/server/schemas/tmdb";
import SearchResult from "./_components/SearchResult";
import Searchbar from "./_components/Searchbar";

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
        transition: {},
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

    const [searchResults, dangerouslySetSearchResults] = useState<
        MovieSearchResults["results"]
    >([]);
    const [amountOfResults, setAmountOfResults] = useState<number | null>(null);

    const [searchResultsKey, setSearchResultsKey] = useState<number>(0);

    const isClient = useIsClient();

    function setSearchResults(results: MovieSearchResults["results"]) {
        dangerouslySetSearchResults(results);
        setSearchResultsKey((prev) => prev + 1);
    }

    useEffect(() => {
        // Set the URL search params to the search query
        const url = new URL(window.location.href);
        url.searchParams.set("query", debouncedSearchQuery);
        window.history.pushState(null, "", url.toString());

        if (debouncedSearchQuery.length === 0) {
            setSearchResults([]);
            setAmountOfResults(null);

            return;
        }

        void getSearchResults(debouncedSearchQuery).then(
            ({ results, total_results }) => {
                setSearchResults(results);
                setAmountOfResults(total_results);
            },
        );
    }, [debouncedSearchQuery]);

    function handleChangeSearchQuery(query: string) {
        setSearchQuery(query);
        setUserHasSearched(true);
    }

    if (!isClient) return null;

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
                    {amountOfResults ? (
                        <span>
                            Showing
                            <b>
                                {amountOfResults === 10000 ? " more than" : ""}{" "}
                                {amountOfResults} results
                            </b>{" "}
                            for &quot;
                            {debouncedSearchQuery}&quot;
                        </span>
                    ) : null}
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8"
                            initial="initial"
                            animate="open"
                            exit="exit"
                            variants={parentVariants}
                            layout
                            key={searchResultsKey}
                        >
                            {searchResults.map((movie) => (
                                <SearchResult key={movie.id} movie={movie} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </main>
    );
}

Search.displayName = "Search";
