export default function MovieLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <div className="mx-auto grid w-full max-w-5xl grid-cols-[4fr_10fr_3fr] grid-rows-[1fr_auto] gap-6 px-8 py-16">
                {children}
            </div>
        </div>
    );
}
