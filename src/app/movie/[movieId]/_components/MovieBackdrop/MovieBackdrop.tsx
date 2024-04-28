import Image from "next/image";
import { ImageHelper } from "~/models/imageHelper";
import { type Movie } from "~/server/schemas/tmdb";

type MovieBackdropProps = {
    backdropPath: Movie["backdrop_path"];
};

export default function MovieBackdrop({ backdropPath }: MovieBackdropProps) {
    return (
        <div className="pointer-events-none fixed left-0 top-0 -z-[1000] h-[50vh] w-full">
            <div className="absolute -z-20 h-full w-full overflow-hidden">
                <div className="h-full w-full blur-[2px]">
                    <Image
                        src={ImageHelper.getImageUrl({
                            type: "backdrop",
                            path: backdropPath,
                            size: "w1280",
                        })}
                        alt=""
                        layout="fill"
                        className="object-cover"
                        priority
                        placeholder="blur"
                        blurDataURL={ImageHelper.getImageUrl({
                            type: "backdrop",
                            path: backdropPath,
                            size: "w300",
                        })}
                    />
                </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-primary/70 to-secondary" />
        </div>
    );
}
