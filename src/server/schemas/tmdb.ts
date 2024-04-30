import { z } from "zod";

export const movieSchema = z.object({
    backdrop_path: z.string().nullable(),
    budget: z.number(),
    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        }),
    ),
    homepage: z.string().nullable(),
    id: z.number(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            logo_path: z.string().nullable(),
            origin_country: z.string(),
        }),
    ),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    status: z.string(),
    tagline: z.string().nullable(),
    title: z.string(),
    video: z.boolean(),
});

export type Movie = z.infer<typeof movieSchema>;

export const movieCreditsSchema = z.object({
    id: z.number(),
    cast: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            profile_path: z.string().nullable(),
            character: z.string(),
        }),
    ),
    crew: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            profile_path: z.string().nullable(),
            job: z.string(),
        }),
    ),
});

export type MovieCredits = z.infer<typeof movieCreditsSchema>;

export const movieRecommendationsSchema = z.object({
    page: z.number(),
    results: z.array(
        z.object({
            backdrop_path: z.string().nullable(),
            id: z.number(),
            media_type: z.string(),
            overview: z.string(),
            poster_path: z.string().nullable(),
            release_date: z.string(),
            title: z.string(),
        }),
    ),
    total_pages: z.number(),
    total_results: z.number(),
});

export type MovieRecommendations = z.infer<typeof movieRecommendationsSchema>;

export const movieSearchResultsSchema = z.object({
    page: z.number(),
    results: z.array(
        z.object({
            backdrop_path: z.string().nullable(),
            id: z.number(),
            overview: z.string(),
            poster_path: z.string().nullable(),
            release_date: z.string(),
            title: z.string(),
        }),
    ),
    total_pages: z.number(),
    total_results: z.number(),
});

export type MovieSearchResults = z.infer<typeof movieSearchResultsSchema>;
