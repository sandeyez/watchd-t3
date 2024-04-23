import axios from "axios"
import { env } from "~/env"
import { movieCreditsSchema, movieSchema } from "../schemas/tmdb";

type GetImageUrlProps = {
    path: string;
} & ({
    type: 'backdrop';
    size: "w300" |  "w780" |  "w1280" | "original"
} | {
    type: 'logo';
    size: "w45" | "w92" |"w154" |"w185" |"w300" |"w500" | "original";
} | {
    type: 'poster';
    size: "w92" |"w154" |"w185" |"w342" |"w500" |"w780" | "original";
} | {
    type: 'profile';
    size: "w45" | "w185" | "h632" | "original";
} | {
    type: 'still';
    size: "w92" | "w185" | "w300" | "original";
})

export default class TMDB {
    static async getMovie({movieId}: {movieId: string}) {
        const res = await axios.get(`${env.TMDB_API_BASE_URL}/movie/${movieId}?language=en-US`,  {
            headers: {
                Authorization: `Bearer ${env.TMDB_API_ACCESS_TOKEN}`,
                Accept: 'application/json'
            }
        })

        try {
            const parsedMovie = movieSchema.parse(res.data);

            return parsedMovie;
        }
        catch (err) {
            console.error(err);

            throw new Error('Movie not found');
        }
    }

    static async getMovieCredits({movieId}: {movieId: string}) {
        const res = await axios.get(`${env.TMDB_API_BASE_URL}/movie/${movieId}/credits?language=en-US`,  {
            headers: {
                Authorization: `Bearer ${env.TMDB_API_ACCESS_TOKEN}`,
                Accept: 'application/json'
            }
        })

        try {
            const parsedCredits = movieCreditsSchema.parse(res.data);

            return parsedCredits;
        }
        catch (err) {
            console.error(err);

            throw new Error('Cast not found');
        }
    }

    static getImageUrl({path, size}: GetImageUrlProps) {
        return `${env.TMDB_IMAGE_BASE_URL}/${size}${path.startsWith('/') ? path : `/${path}`}`
    }
}