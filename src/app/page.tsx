import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import Button from "./_components/Button";
import Link from "next/link";
import { Input } from "./_components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        return redirect("/home");
    }
    return (
        <main className="relative flex h-full w-full items-center justify-center">
            <Image
                src="/landing_page.png"
                alt="Watchd logo"
                className="fixed left-0 top-0 h-screen w-screen object-cover"
                width={3024}
                height={1772}
                priority
            />
            <div className="fixed left-0 top-[72px] z-10 h-full w-screen bg-gradient-to-b from-primary to-secondary/50" />

            <div className="relative z-20 flex -translate-y-10 flex-col items-center gap-4 text-center">
                <h1
                    style={{
                        fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                    }}
                    className="gradient-text max-w-6xl font-bold leading-tight"
                >
                    Extending your movie experience in ways you can’t imagine
                </h1>
                <span className="block max-w-xl text-white">
                    Using <b>watchd</b>, you connect with friends to share your
                    movie experience. Check-in to let the world know your
                    thoughts, maintain a watchlist and stay on top of ongoing
                    trends using the discovery tab.
                </span>
                <div className="flex w-full items-center justify-center gap-4">
                    <Link href="/login" className="w-full max-w-64 sm:w-fit">
                        <Button className="w-full sm:w-36">Get started</Button>
                    </Link>
                    <Link href="/search" className="hidden sm:block">
                        <Input
                            className="w-72"
                            placeholder="Search through movies..."
                            before={
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="size-4 text-tertiary"
                                />
                            }
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}
