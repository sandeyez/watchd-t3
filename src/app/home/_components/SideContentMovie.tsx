import type { Movie } from "~/server/schemas/tmdb";
import Image from "next/image";
import { ImageHelper } from "~/models/imageHelper";
import Link from "next/link";

type SideContentMovieProps = {
    movie: Pick<Movie, "backdrop_path" | "id" | "title" | "release_date">;
};

function SideContentMovie({ movie }: SideContentMovieProps): JSX.Element {
    return (
        <Link href={`/movie/${movie.id}`} prefetch>
            <div className="relative h-14 w-full overflow-hidden rounded-lg">
                {movie.backdrop_path && (
                    <div className="">
                        <Image
                            src={ImageHelper.getImageUrl({
                                type: "backdrop",
                                path: movie.backdrop_path,
                                size: "w1280",
                            })}
                            alt=""
                            layout="fill"
                            className="z-0 object-cover object-[center_20%]"
                        />
                    </div>
                )}
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-primary/70  to-secondary/85 transition-opacity duration-150 group-hover/side-content-movie:opacity-80" />
                <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-center p-2.5">
                    <h4 className="line-clamp-1 font-bold leading-5">
                        {movie.title}
                    </h4>
                    {movie.release_date && (
                        <span className="text-xs">
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default SideContentMovie;
