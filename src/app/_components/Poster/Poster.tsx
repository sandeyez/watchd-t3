"use client";

import { ImageHelper, type TMDBImageSizes } from "~/models/imageHelper";
import RenderInWrapperIf from "../RenderInWrapperIf/RenderInWrapperIf";
import Link from "next/link";
import Image from "next/image";
import PosterPlaceholder from "../Placeholders/PosterPlaceholder";
import { type Movie } from "~/server/schemas/tmdb";

type PosterProps = {
    posterPath: Movie["poster_path"];
    imageSize: TMDBImageSizes["poster"];
    altText: string;
    href?: string;
};

function Poster({
    altText,
    imageSize,
    posterPath,
    href,
}: PosterProps): JSX.Element {
    return (
        <RenderInWrapperIf
            condition={!!href}
            wrapper={(children) => <Link href={href!}>{children}</Link>}
        >
            <div className="h-full w-full overflow-hidden rounded-lg">
                {posterPath ? (
                    <Image
                        src={ImageHelper.getImageUrl({
                            path: posterPath,
                            type: "poster",
                            size: imageSize,
                        })}
                        width={228}
                        height={342}
                        alt={altText}
                        priority
                        className="h-full w-full object-cover"
                        placeholder="blur"
                        blurDataURL={ImageHelper.getImageUrl({
                            path: posterPath,
                            type: "poster",
                            size: "w92",
                        })}
                    />
                ) : (
                    <PosterPlaceholder altText={altText} />
                )}
            </div>
        </RenderInWrapperIf>
    );
}

export default Poster;
