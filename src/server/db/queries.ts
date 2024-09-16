"use server";

import { getServerSession } from "next-auth/next";
import { db } from ".";
import { review, watchlistItem } from "./schema";
import { authOptions } from "../auth";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import TMDB from "~/models/tmdb";

function revalidatePathIfExist(path: string | undefined) {
    if (path) {
        revalidatePath(path);
    }
}

type AddToWatchlistProps = {
    movieId: number;
    pathToRevalidate?: string;
};

export async function addToWatchlist({
    movieId,
    pathToRevalidate,
}: AddToWatchlistProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const existingWatchlistItem = await db
        .select()
        .from(watchlistItem)
        .where(
            and(
                eq(watchlistItem.movieId, movieId),
                eq(watchlistItem.userId, session.user.id),
            ),
        );

    if (existingWatchlistItem.length > 0) {
        return;
    }

    try {
        await db.insert(watchlistItem).values({
            movieId,
            userId: session.user.id,
        });
    } catch (error) {
        console.error(error);
    }

    revalidatePathIfExist(pathToRevalidate);
}

type RemoveFromWatchlistProps = {
    movieId: number;
    pathToRevalidate?: string;
};

export async function removeFromWatchlist({
    movieId,
    pathToRevalidate,
}: RemoveFromWatchlistProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const existingWatchlistItem = await db
        .select()
        .from(watchlistItem)
        .where(
            and(
                eq(watchlistItem.movieId, movieId),
                eq(watchlistItem.userId, session.user.id),
            ),
        );

    if (existingWatchlistItem.length === 0) {
        return;
    }

    try {
        await db
            .delete(watchlistItem)
            .where(
                and(
                    eq(watchlistItem.movieId, movieId),
                    eq(watchlistItem.userId, session.user.id),
                ),
            );
    } catch (error) {
        console.error(error);
    }

    revalidatePathIfExist(pathToRevalidate);
}

export async function getWatchlistMovies(limit?: number, offset?: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return [];
    }

    const watchlistMovies = await db.query.watchlistItem.findMany({
        where: (watchlistItem, { eq }) =>
            eq(watchlistItem.userId, session.user.id),
        orderBy: [desc(watchlistItem.createdAt)],
        limit,
        offset,
    });

    return await Promise.all(
        watchlistMovies.map((movie) =>
            TMDB.getMovie({
                movieId: movie.movieId.toString(),
            }),
        ),
    );
}

export async function isMovieInWatchlist({ movieId }: { movieId: number }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return false;
    }

    const existingWatchlistItem = await db
        .select()
        .from(watchlistItem)
        .where(
            and(
                eq(watchlistItem.movieId, movieId),
                eq(watchlistItem.userId, session.user.id),
            ),
        );

    return existingWatchlistItem.length > 0;
}

type AddMovieReviewProps = {
    movieId: number;
    rating: number;
    review: string;
};

export async function addMovieReview({
    movieId,
    rating,
    review: reviewText,
}: AddMovieReviewProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("User is not authenticated");
    }

    try {
        await db.insert(review).values({
            movieId,
            userId: session.user.id,
            rating,
            review: reviewText,
        });
    } catch (error) {
        console.error(error);
    }
}
