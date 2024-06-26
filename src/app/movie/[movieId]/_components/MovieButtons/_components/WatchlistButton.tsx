"use client";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimationControls } from "framer-motion";
import { useOptimistic } from "react";
import Button from "~/app/_components/Button";
import { cn } from "~/lib/utils";
import { addToWatchlist, removeFromWatchlist } from "~/server/db/queries";
import { useMovie } from "../../../_providers";

type WatchlistButtonProps = {
    isAddedToWatchlist: boolean;
};

function WatchlistButton({
    isAddedToWatchlist,
}: WatchlistButtonProps): JSX.Element {
    const { id: movieId } = useMovie();

    const [optimisticIsAddedToWatchlist, setOptimisticIsAddedToWatchlist] =
        useOptimistic(isAddedToWatchlist);

    const controls = useAnimationControls();

    async function addToWatchlistAction() {
        setOptimisticIsAddedToWatchlist((prev) => !prev);
        const pathToRevalidate = `/movie/${movieId}`;

        if (optimisticIsAddedToWatchlist) {
            controls.stop();
            void controls.start({
                scale: 1,
                rotate: 0,
                transition: { duration: 0.5, ease: "easeInOut" },
            });
            await removeFromWatchlist({ movieId, pathToRevalidate });
        } else {
            void controls.start({
                scale: [1, 2, 2, 1],
                rotate: [0, 0, 360, 360],
                transition: {
                    duration: 1,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1],
                },
                transitionEnd: {
                    scale: 1,
                    rotate: 0,
                },
            });
            await addToWatchlist({ movieId, pathToRevalidate });
        }
    }

    return (
        <form action={addToWatchlistAction}>
            <Button
                size="icon"
                variant="outline"
                className="aspect-square"
                tooltip={
                    optimisticIsAddedToWatchlist
                        ? "Remove from watchlist"
                        : "Add to watchlist"
                }
            >
                <motion.div animate={controls} className="h-5 w-5">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={cn("h-full w-full", {
                            "text-red-400": optimisticIsAddedToWatchlist,
                        })}
                    />
                </motion.div>
            </Button>
        </form>
    );
}

export default WatchlistButton;
