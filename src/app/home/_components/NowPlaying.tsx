import TMDB from "~/models/tmdb";
import SideContentMovie from "./SideContentMovie";

async function NowPlaying() {
    const { results: nowPlayingMovies } = await TMDB.getNowPlayingMovies();

    return (
        <div className="grid h-full auto-rows-min grid-cols-1 gap-3 overflow-hidden">
            {nowPlayingMovies.slice(0, 10).map((movie) => (
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

export default NowPlaying;
