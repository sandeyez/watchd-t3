import NowPlaying from "./_components/NowPlaying";
import { SideContent } from "./_components/SideContent";
import { Watchlist } from "./_components/Watchlist";

export default function HomePage() {
    return (
        <main className="grid h-full max-h-[calc(100vh-80px)] w-full grid-cols-[20rem_auto_20rem] grid-rows-1 gap-4 pt-2.5">
            <div className="h-full w-full rounded-tr-3xl bg-gradient-to-t from-primary to-secondary shadow-xl">
                <SideContent
                    title="Watchlist"
                    linkText="View all"
                    linkHref="/watchlist"
                    placement="left"
                >
                    <Watchlist />
                </SideContent>
            </div>
            <div className="h-full w-full"></div>
            <div className="h-full w-full rounded-tl-3xl bg-gradient-to-t from-primary to-secondary shadow-xl">
                <SideContent
                    title="In theatres"
                    linkText="More"
                    linkHref="/discover"
                    placement="right"
                >
                    <NowPlaying />
                </SideContent>
            </div>
        </main>
    );
}
