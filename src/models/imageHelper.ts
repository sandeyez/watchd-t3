import { env } from "~/env";

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

export class ImageHelper {
    static getImageUrl({ path, size }: GetImageUrlProps) {
        if (typeof path !== "string" || !path) {
            console.log("No path provided for image", path);
        }
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        return `${env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
    }
}
