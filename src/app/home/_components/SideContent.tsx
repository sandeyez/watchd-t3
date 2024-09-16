"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ReactNode, Suspense } from "react";
import Separator from "~/app/_components/Separator";
import { Skeleton } from "~/app/_components/Skeleton";
import { cn } from "~/lib/utils";

function SideContentMoviesSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {new Array(10).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full bg-tertiary" />
            ))}
        </div>
    );
}

type SideContentProps = {
    title: string;
    linkText: string;
    linkHref: string;
    placement: "left" | "right";
    children?: ReactNode;
};

export function SideContent({
    linkHref,
    linkText,
    title,
    placement,
    children,
}: SideContentProps) {
    return (
        <section
            className={cn("flex h-full flex-col gap-3 p-6", {
                "pl-4": placement === "left",
                "pr-4": placement === "right",
            })}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <a
                    href={linkHref}
                    className="flex items-center gap-1 text-sm text-gradientBlue"
                >
                    {linkText}{" "}
                    <FontAwesomeIcon icon={faChevronRight} className="h-3.5" />
                </a>
            </div>
            <Separator />

            <Suspense fallback={<SideContentMoviesSkeleton />}>
                {children}
            </Suspense>
        </section>
    );
}
