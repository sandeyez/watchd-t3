"use client";

import { createContext, type ReactNode } from "react";
import { type Movie, type MovieCredits } from "~/server/schemas/tmdb";
import { useContextSafely } from "~/utils/react";

type MovieProvidersProps = {
    children: ReactNode;
    movie: Movie;
    credits: MovieCredits;
};

const MovieContext = createContext<Movie | null>(null);
const MovieCreditsContext = createContext<MovieCredits | null>(null);

export const useMovie = () => useContextSafely(MovieContext);
export const useMovieCredits = () => useContextSafely(MovieCreditsContext);

export default function MovieProviders({
    movie,
    credits,
    children,
}: MovieProvidersProps) {
    return (
        <MovieContext.Provider value={movie}>
            <MovieCreditsContext.Provider value={credits}>
                {children}
            </MovieCreditsContext.Provider>
        </MovieContext.Provider>
    );
}
