"use server";

import { getServerSession } from "next-auth/next";
import { db } from ".";
import { watchlistItem } from "./schema";
import { authOptions } from "../auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
