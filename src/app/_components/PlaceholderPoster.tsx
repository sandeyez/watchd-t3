import Image from "next/image";

type PlaceholderPosterProps = {
    altText: string;
};

export default function PlaceholderPoster({
    altText,
}: PlaceholderPosterProps): JSX.Element {
    return (
        <div className="relative h-full w-full">
            <Image
                src="/poster_placeholder.svg"
                alt={altText}
                layout="fill"
                className="object-cover"
            />
        </div>
    );
}
