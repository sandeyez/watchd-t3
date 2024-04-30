"use client";

import {
    faBars,
    faClose,
    faFilm,
    faHome,
    faSearch,
    faStar,
    type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toggleBodyScrolling } from "~/utils/react";
import PersonAvatar from "./PersonAvatar";

type NavItemProps = {
    icon: IconDefinition;
    title: string;
    href: string;
};

function NavItem({ href, icon, title }: NavItemProps): JSX.Element {
    return (
        <Link href={href}>
            <motion.div
                className="flex items-center gap-3 text-white"
                whileHover={{
                    scale: 1.1,
                    translateY: -2,
                    transition: {
                        ease: "easeIn",
                        duration: 0.1,
                    },
                }}
            >
                <FontAwesomeIcon
                    icon={icon}
                    className="aspect-square h-5 md:h-4 "
                />
                <span className="text-sm font-semibold">{title}</span>
            </motion.div>
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

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data, status } = useSession();

    const toggleMenu = () => {
        toggleBodyScrolling(isMenuOpen);
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="flex h-[72px] items-center justify-between gap-4 bg-primary px-6 py-4 md:grid md:grid-flow-col">
            <Link
                href="/"
                className="flex h-fit items-center justify-center md:justify-start"
            >
                <Image
                    src="/logo.svg"
                    width={120}
                    height={24}
                    alt="Watchd logo"
                    className="h-6"
                />
            </Link>
            <div className="hidden flex-grow flex-col items-center justify-start gap-8 pt-8 md:flex md:flex-row md:justify-center md:gap-12 md:pt-0">
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
            </div>
            <div className="hidden items-center justify-end md:flex">
                {status === "authenticated" ? (
                    <Link href="/profile" className="text-white">
                        <PersonAvatar
                            src={data.user.image}
                            altText="Profile picture"
                            variant="small"
                            withBorder
                        />
                    </Link>
                ) : (
                    <Link href="/login" className="text-white">
                        Login
                    </Link>
                )}
            </div>

            <FontAwesomeIcon
                icon={isMenuOpen ? faClose : faBars}
                className="h-6 w-6 cursor-pointer text-white md:hidden"
                onClick={toggleMenu}
            />
            <AnimatePresence initial={false} mode="wait">
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="fixed bottom-0 left-0 z-40 h-[calc(100dvh-72px)] w-screen"
                            initial={{
                                backdropFilter: "blur(0px)",
                            }}
                            animate={{
                                backdropFilter: "blur(12px)",
                            }}
                            exit={{
                                backdropFilter: "blur(0px)",
                            }}
                            onClick={toggleMenu}
                        />
                        <motion.div
                            className="fixed bottom-0 z-50 h-[calc(100dvh-72px)] w-[50vw] min-w-72 max-w-[100vw] bg-secondary"
                            initial={{
                                right: "-100%",
                            }}
                            animate={{
                                right: isMenuOpen ? "0%" : "-100%",
                            }}
                            exit={{
                                right: "-100%",
                            }}
                        >
                            <div className="flex h-full w-full">
                                <div className="h-full w-[2px] bg-gradient-to-b from-gradientPink to-gradientBlue" />
                                <div className="flex flex-col gap-8 p-8">
                                    {navItems.map((item, index) => (
                                        <NavItem key={index} {...item} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
