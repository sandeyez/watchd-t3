"use client";

import { api } from "~/trpc/react";

export default function MoviePage({ params }: { params: { movieId: string } }) {
    const test = api.tmdb.getMovie.useQuery({ movieId: params.movieId });

    console.log(test.data)

    return <div>
        <h1>Movie Page</h1>
        <p>{test.data?.title}</p>
    </div>;
}