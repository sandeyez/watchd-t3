import { getWatchlistMovies } from "~/server/db/queries";
import SideContentMovie from "./SideContentMovie";

export async function Watchlist() {
    const watchlistMovies = await getWatchlistMovies(10);

    return (
        <div className="grid h-full auto-rows-min grid-cols-1 gap-3 overflow-hidden">
            {watchlistMovies.map((movie) => (
                <div
                    key={movie.id}
                    className="group/side-content-movie relative"
                >
                    <SideContentMovie movie={movie} />
                </div>
            ))}
        </div>
    );
}
