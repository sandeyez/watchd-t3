import Image from "next/image";

type PosterPlaceholderProps = {
    altText: string;
};

function PosterPlaceholder({ altText }: PosterPlaceholderProps): JSX.Element {
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

export default PosterPlaceholder;
