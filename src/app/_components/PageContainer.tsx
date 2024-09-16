import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type PageContainerProps = {
    children: ReactNode;
    className?: string;
};

function PageContainer({
    children,
    className,
}: PageContainerProps): JSX.Element {
    return (
        <main className={cn("h-full w-full flex-grow px-4 md:px-8", className)}>
            {children}
        </main>
    );
}

export default PageContainer;
