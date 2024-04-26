import axios from "axios";
import { notFound } from "next/navigation";
import "server-only";
import { env } from "~/env";
import {
    movieCreditsSchema,
    movieRecommendationsSchema,
    movieSchema,
} from "../schemas/tmdb";

export type TMDBImageSizes = {
    backdrop: "w300" | "w780" | "w1280" | "original";
    logo: "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
    poster: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
    profile: "w45" | "w185" | "h632" | "original";
    still: "w92" | "w185" | "w300" | "original";
};

type GetImageUrlProps = {
    path: string;
} & (
    | {
          type: "backdrop";
          size: TMDBImageSizes["backdrop"];
      }
    | {
          type: "logo";
          size: TMDBImageSizes["logo"];
      }
    | {
          type: "poster";
          size: TMDBImageSizes["poster"];
      }
    | {
          type: "profile";
          size: TMDBImageSizes["profile"];
      }
    | {
          type: "still";
          size: TMDBImageSizes["still"];
      }
);
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

    static getImageUrl({ path, size }: GetImageUrlProps) {
        return `${env.TMDB_IMAGE_BASE_URL}/${size}${path.startsWith("/") ? path : `/${path}`}`;
    }
}
