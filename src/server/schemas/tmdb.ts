import { z } from "zod";

export const movieSchema = z.object({
    backdrop_path: z.string(),
    budget: z.number(),
    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        }),
    ),
    id: z.number(),
    overview: z.string(),
    poster_path: z.string(),
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
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
});

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
