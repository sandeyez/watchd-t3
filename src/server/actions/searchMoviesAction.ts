"use server";

import TMDB from "~/models/tmdb";

export async function getSearchResults(query: string) {
    return await TMDB.searchMovies({ query });
}
