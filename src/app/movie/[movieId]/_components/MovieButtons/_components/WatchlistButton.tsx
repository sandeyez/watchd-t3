"use client";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimationControls } from "framer-motion";
import { useOptimistic } from "react";
import Button from "~/app/_components/Button/Button";
import { cn } from "~/lib/utils";
import { addToWatchlist, removeFromWatchlist } from "~/server/db/queries";

type WatchlistButtonProps = {
    movieId: number;
    isAddedToWatchlist: boolean;
};

function WatchlistButton({
    isAddedToWatchlist,
    movieId,
}: WatchlistButtonProps): JSX.Element {
    const [optimisticIsAddedToWatchlist, setOptimisticIsAddedToWatchlist] =
        useOptimistic(isAddedToWatchlist);

    const controls = useAnimationControls();

    async function addToWatchlistAction() {
        setOptimisticIsAddedToWatchlist((prev) => !prev);
        const pathToRevalidate = `/movie/${movieId}`;

        if (optimisticIsAddedToWatchlist) {
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
