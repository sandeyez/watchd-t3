import axios from "axios";
import { notFound } from "next/navigation";
import "server-only";
import { env } from "~/env";
import {
    movieCreditsSchema,
    movieRecommendationsSchema,
    movieSchema,
} from "../server/schemas/tmdb";

export default class TMDB {
    private static async makeRequest(path: string) {
        const res = await axios.get(
            `${env.TMDB_API_BASE_URL}/${path}?language=en-US`,
            {
                headers: {
                    Authorization: `Bearer ${env.TMDB_API_ACCESS_TOKEN}`,
                    Accept: "application/json",
                },
            },
        );

        return res;
    }

    static async getMovie({ movieId }: { movieId: string }) {
        try {
            const res = await this.makeRequest(`/movie/${movieId}`);

            const parsedMovie = movieSchema.parse(res.data);

            return parsedMovie;
        } catch (err) {
            console.error(err);

            return notFound();
        }
    }

    static async getMovieCredits({ movieId }: { movieId: string }) {
        try {
            const res = await this.makeRequest(`/movie/${movieId}/credits`);

            const parsedCredits = movieCreditsSchema.parse(res.data);

            return parsedCredits;
        } catch (err) {
            console.error(err);

            return notFound();
        }
    }

    static async getRecommendedMovies({ movieId }: { movieId: string }) {
        try {
            const res = await this.makeRequest(
                `/movie/${movieId}/recommendations`,
            );

            const parsedRecommendations = movieRecommendationsSchema.parse(
                res.data,
            );

            return parsedRecommendations;
        } catch (err) {
            console.error(err);

            return notFound();
        }
    }
}
