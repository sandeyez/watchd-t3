import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    type IconDefinition,
    faHome,
    faFilm,
    faStar,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import "server-only";

type NavItemProps = {
    icon: IconDefinition;
    title: string;
    href: string;
};

function NavItem({ href, icon, title }: NavItemProps): JSX.Element {
    return (
        <Link href={href} className="flex items-center gap-3 text-white">
            <FontAwesomeIcon
                icon={icon}
                className="aspect-square h-5 md:h-4 "
            />
            <span className="hidden text-sm font-semibold md:inline">
                {title}
            </span>
        </Link>
    );
}

const navItems: NavItemProps[] = [
    {
        icon: faHome,
        title: "Home",
        href: "/",
    },
    {
        icon: faFilm,
        title: "Discover",
        href: "/discover",
    },
    {
        icon: faStar,
        title: "Watchlist",
        href: "/watchlist",
    },
    {
        icon: faSearch,
        title: "Search",
        href: "/search",
    },
];

async function Navbar() {
    const session = await getServerAuthSession();

    return (
        <nav className="flex h-screen flex-col gap-4 bg-primary px-2 py-6 md:grid md:h-fit md:grid-flow-col md:px-4">
            <Link
                href="/"
                className="flex h-fit items-center justify-center md:justify-start"
            >
                <Image
                    src="/logo.svg"
                    width={120}
                    height={24}
                    alt="Watchd logo"
                    className="hidden md:block"
                />
                <Image
                    src="/logo_small.svg"
                    width={126}
                    height={120}
                    alt="Watchd logo"
                    className="w-8 md:hidden"
                />
            </Link>
            <div className="flex flex-grow flex-col items-center justify-start gap-8 pt-8 md:flex-row md:justify-center md:gap-12 md:pt-0">
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
            </div>
            <div className="flex items-center justify-end">
                {session ? (
                    <Link href="/profile" className="text-white">
                        Profile
                    </Link>
                ) : (
                    <Link href="/login" className="text-white">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
