"use client";

import {
    easeInOut,
    easeOut,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import { ImageHelper } from "~/models/imageHelper";
import { useMovie } from "../../_providers";

export default function MovieBackdrop() {
    const { backdrop_path: backdropPath } = useMovie();

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0], {
        ease: easeInOut,
    });
    const y = useTransform(scrollY, [0, 400], [0, -50], {
        ease: easeOut,
    });
    const scale = useTransform(scrollY, [0, 400], [1, 1.25], {
        ease: easeOut,
    });

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 -z-[1000] h-[50vh] w-full translate-y-8"
            style={{ opacity, y, scale }}
        >
            <div className="absolute -z-20 h-full w-full overflow-hidden">
                <div className="h-full w-full blur-[2px]">
                    {backdropPath && (
                        <Image
                            src={ImageHelper.getImageUrl({
                                type: "backdrop",
                                path: backdropPath,
                                size: "w1280",
                            })}
                            alt=""
                            layout="fill"
                            className="object-cover object-[center_25%]"
                            priority
                            placeholder="blur"
                            blurDataURL={ImageHelper.getImageUrl({
                                type: "backdrop",
                                path: backdropPath,
                                size: "w300",
                            })}
                        />
                    )}
                </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-primary/50 to-primary" />
        </motion.div>
    );
}
