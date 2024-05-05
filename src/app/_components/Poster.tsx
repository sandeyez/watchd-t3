"use client";

import { ImageHelper, type TMDBImageSizes } from "~/models/imageHelper";
import RenderInWrapperIf from "./RenderInWrapperIf";
import Link from "next/link";
import Image from "next/image";
import PlaceholderPoster from "./PlaceholderPoster";
import { type Movie } from "~/server/schemas/tmdb";
import { cn } from "~/lib/utils";
import { useState } from "react";

type PosterProps = {
    posterPath: Movie["poster_path"];
    imageSize: TMDBImageSizes["poster"];
    altText: string;
    href?: string;
    objectCover?: boolean;
};

function Poster({
    altText,
    imageSize,
    posterPath,
    href,
    objectCover,
}: PosterProps): JSX.Element {
    return (
        <RenderInWrapperIf
            condition={!!href}
            wrapper={(children) => <Link href={href!}>{children}</Link>}
        >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                {posterPath !== null ? (
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
                        className={cn("h-full w-full object-contain", {
                            "object-cover": objectCover,
                        })}
                        placeholder="blur"
                        blurDataURL={ImageHelper.getImageUrl({
                            path: posterPath,
                            type: "poster",
                            size: "w92",
                        })}
                    />
                ) : (
                    <PlaceholderPoster altText={altText} />
                )}
            </div>
        </RenderInWrapperIf>
    );
}

export default Poster;
