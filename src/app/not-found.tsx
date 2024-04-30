import Link from "next/link";
import Button from "./_components/Button/Button";

export default async function NotFoundPage() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 p-8">
            <div className="fixed left-0 top-[72px] -z-10 h-full w-full bg-gradient-to-b from-secondary to-tertiary"></div>
            <div className="flex max-w-lg flex-col items-center gap-2 text-center">
                <span className="gradient-text text-4xl font-bold">
                    Oops...
                </span>
                <span>
                    We could not find that page. Discover the most popular
                    movies and TV shows, and follow your friends on the Watchd
                    homepage.
                </span>
            </div>
            <Link href="/">
                <Button variant="secondary">Go back home</Button>
            </Link>
        </div>
    );
}
