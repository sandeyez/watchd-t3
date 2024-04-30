/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { cn } from "~/lib/utils";
import { Input } from "../_components/Input";
import { getSearchResults } from "~/server/actions/searchMoviesAction";
import { type MovieSearchResults } from "~/server/schemas/tmdb";
import Poster from "../_components/Poster";
import URLBuilder from "~/models/urlBuilder";

type SearchbarProps = {
    placeholder: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    userHasSearched: boolean;
};

function Searchbar({
    placeholder,
    searchQuery,
    setSearchQuery,
    userHasSearched,
}: SearchbarProps) {
    return (
        <motion.div
            className={cn("w-96", {
                "w-full": userHasSearched || searchQuery.length > 0,
            })}
            layoutId="searchbar"
        >
            <Input
                before={
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="size-4 text-tertiary"
                    />
                }
                placeholder={`Search for ${userHasSearched ? "movies" : placeholder}...`}
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
            />
        </motion.div>
    );
}

const searchResultPosterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1 },
};

const placeholderMovies = [
    "The Shawshank Redemption",
    "Iron Man",
    "Titanic",
    "The Godfather",
    "Star Wars",
    "Jurrasic Park",
    "The Matrix",
    "Forrest Gump",
    "The Dark Knight",
    "Harry Potter",
];

export default function Search() {
    const [placeholder, dangerouslySetPlaceholder] = useState("");
    const placeholderRef = useRef(placeholder);

    const [nextPlaceholderIndex, setNextPlaceholderIndex] = useState(
        Math.floor(Math.random() * placeholderMovies.length),
    );
    const [nextPlaceholder, setNextPlaceholder] = useState(
        placeholderMovies[nextPlaceholderIndex]!,
    );
    const [buildingPlaceholder, setBuildingPlaceholder] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const [searchResults, setSearchResults] = useState<
        MovieSearchResults["results"]
    >([]);
    const [userHasSearched, dangerouslySetUserHasSearched] = useState(false);
    const userHasSearchedRef = useRef(userHasSearched);

    function setPlaceholder(value: string) {
        dangerouslySetPlaceholder(value);
        placeholderRef.current = value;
    }

    function setUserHasSearched(value: boolean) {
        dangerouslySetUserHasSearched(value);
        userHasSearchedRef.current = value;
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (buildingPlaceholder) {
            interval = setInterval(() => {
                if (userHasSearchedRef.current) return;

                setPlaceholder(
                    nextPlaceholder.slice(0, placeholderRef.current.length + 1),
                );
            }, 100);
        } else {
            interval = setInterval(() => {
                if (userHasSearchedRef.current) return;

                setPlaceholder(
                    placeholderRef.current.slice(
                        0,
                        placeholderRef.current.length - 1,
                    ),
                );
            }, 100);
        }

        return () => clearInterval(interval);
    }, [buildingPlaceholder]);

    useEffect(() => {
        if (buildingPlaceholder && placeholder === nextPlaceholder) {
            setTimeout(() => setBuildingPlaceholder(false), 3000);
        }

        if (!buildingPlaceholder && placeholder === "") {
            const nextIndex =
                (nextPlaceholderIndex + 1) % placeholderMovies.length;

            setNextPlaceholderIndex(nextIndex);
            setNextPlaceholder(placeholderMovies[nextIndex]!);
            setTimeout(() => setBuildingPlaceholder(true), 500);
        }
    }, [placeholder, nextPlaceholder]);

    useEffect(() => {
        if (debouncedSearchQuery.length === 0) {
            setSearchResults([]);

            return;
        }

        void getSearchResults(debouncedSearchQuery).then(({ results }) => {
            setSearchResults(results);
        });
        setUserHasSearched(true);
    }, [debouncedSearchQuery]);

    return (
        <main className="h-full w-full">
            <AnimatePresence mode="wait" initial={false}>
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
                                    placeholder={placeholder}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    userHasSearched={userHasSearched}
                                />
                            </>
                        )}
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Searchbar
                            placeholder={placeholder}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            userHasSearched={userHasSearched}
                        />
                        <motion.div
                            className="grid grid-cols-6 gap-4"
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.5,
                                        staggerDirection: -1,
                                    },
                                },
                            }}
                        >
                            {searchResults.map((movie) => (
                                <motion.div
                                    key={movie.id}
                                    className="h-full w-full"
                                    variants={searchResultPosterVariants}
                                    whileHover={{ scale: 1.05 }}
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
            </AnimatePresence>
        </main>
    );
}
