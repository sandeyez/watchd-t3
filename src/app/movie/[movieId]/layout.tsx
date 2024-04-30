export default function MovieLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <div className="mx-auto grid w-full max-w-5xl grid-cols-[4fr_10fr] grid-rows-[1fr_auto] gap-4 px-4 pb-8 pt-16 md:grid-cols-[4fr_10fr_3fr] md:gap-6 md:px-8">
                {children}
            </div>
        </div>
    );
}
