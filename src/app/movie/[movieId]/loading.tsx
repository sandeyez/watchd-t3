import { Skeleton } from "~/components/ui/skeleton";

export default function test() {
    return (
        <>
            {/* Poster */}
            <div>
                <Skeleton className="aspect-[2/3] w-full" />
            </div>
            {/* Metadata */}
            <div className="flex flex-col justify-end gap-2">
                <Skeleton className="h-10 w-96" />
                <Skeleton className="h-3 w-52" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-64" />
            </div>
            {/* Buttons */}
            <div className="flex flex-col justify-end gap-4">
                <Skeleton className="flex h-10 w-full" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
            {/* Cast */}
            <div className="flex w-full flex-col">
                <Skeleton className="mb-2 h-6 w-16" />
                <div className="flex w-full flex-col gap-2">
                    {new Array(8).fill(null).map((_, index) => (
                        <div key={index} className="flex w-full gap-2">
                            <Skeleton className="max-h-12 min-h-12 min-w-12 max-w-12 rounded-full" />
                            <div className="flex w-full flex-col gap-2">
                                <Skeleton className="h-3 w-2/3" />
                                <Skeleton className="h-2 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Description */}
            <div className="flex w-full flex-col">
                <Skeleton className="mb-2 h-6 w-28" />
                <Skeleton className="h-24 w-full" />
            </div>
        </>
    );
}
