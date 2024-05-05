"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "~/app/_components/Button";
import EmojiSelect from "~/app/_components/EmojiSelect";
import Modal from "~/app/_components/Modal";
import PersonAvatar from "~/app/_components/PersonAvatar";
import Poster from "~/app/_components/Poster";
import { Textarea } from "~/app/_components/Textarea";
import { addMovieReview } from "~/server/db/queries";
import { ratings, ratingsMap } from "~/utils/ratings";
import { useMovie } from "../../../_providers";

function CheckInButton() {
    const {
        id: movieId,
        title,
        poster_path: posterPath,
        release_date: releaseDate,
        runtime,
    } = useMovie();
    const { data: sessionData } = useSession();

    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    async function addMovieReviewAction() {
        if (!rating) return;

        await addMovieReview({
            movieId,
            rating,
            review,
        });
    }

    const handleModalClose = () => {
        setModalIsOpen(false);
    };

    return (
        <form action={addMovieReviewAction} className="max-h-10 w-full">
            <Button
                variant="default"
                type="button"
                className="max-h-10 w-full max-w-44 flex-grow"
                onClick={() => setModalIsOpen(true)}
                showPendingState
            >
                Check-in
            </Button>

            <Modal
                open={modalIsOpen}
                title={`Leave a review`}
                onClose={handleModalClose}
            >
                <div className="flex w-full flex-col gap-8">
                    <div className="flex gap-4">
                        <div className="aspect-[2/3] h-40">
                            <Poster
                                altText={`${title} poster`}
                                imageSize="w342"
                                posterPath={posterPath}
                            />
                        </div>
                        <div className="flex flex-grow flex-col justify-end gap-1">
                            <div className="flex items-center gap-1 text-sm">
                                <PersonAvatar
                                    src={sessionData?.user.image}
                                    altText="Profile picture"
                                    variant="mini"
                                />
                                <span className="ml-1 font-bold">You</span>
                                <span>watched</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="gradient-text text-2xl font-bold">
                                    {title}
                                </span>
                                <div className="flex items-center gap-2 text-xs">
                                    {releaseDate && (
                                        <span>
                                            {new Date(
                                                releaseDate,
                                            ).getFullYear()}
                                        </span>
                                    )}
                                    {releaseDate && runtime && <span> • </span>}
                                    {runtime && <span>{runtime} min</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold">What did you think?</span>
                        <EmojiSelect
                            options={ratings}
                            value={rating}
                            onChange={setRating}
                        />
                        <Textarea
                            className="mt-2"
                            placeholder={
                                rating !== null
                                    ? `This movie was ${ratingsMap.get(rating)?.inline} because...`
                                    : undefined
                            }
                            disabled={rating === null}
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            variant="default"
                            type="submit"
                            className="w-full"
                            disabled={!rating}
                            wide
                            onClick={handleModalClose}
                        >
                            Post review
                        </Button>
                    </div>
                </div>
            </Modal>
        </form>
    );
}

export default CheckInButton;
