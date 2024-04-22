import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import axios from 'axios';
import { movieSchema } from "~/server/schemas/tmdb";



export const tmdbRouter = createTRPCRouter({
    getMovie: publicProcedure
    .input(z.object({ movieId: z.string() }))
    .query(async ({input}) => {
        const res = await axios.get(`${env.TMDB_API_BASE_URL}/movie/${input.movieId}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${env.TMDB_API_ACCESS_TOKEN}`,
                Accept: 'application/json'
            }
        })

        console.log(res.data)

        try {
            const parsedMovie = movieSchema.parse(res.data);

            return parsedMovie;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    })
});