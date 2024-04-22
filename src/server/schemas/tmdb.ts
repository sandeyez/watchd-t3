import { z } from "zod";

export const movieSchema = z.object({
    backdrop_path: z.string(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string()
    })),
    id: z.number(),
    poster_path: z.string(),
    release_date: z.string(),
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
})