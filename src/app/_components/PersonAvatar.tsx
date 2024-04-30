import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { cn } from "~/lib/utils";
import PlaceholderPerson from "./PlaceholderPerson";

const avatarVariants = cva(
    "relative aspect-square overflow-hidden rounded-full",
    {
        variants: {
            variant: {
                default: "size-12 min-w-12 min-h-12 max-w-12 max-h-12",
                small: "size-8 min-w-8 min-h-8 max-w-8 max-h-8",
                mini: "size-5 min-w-5 min-h-5 max-w-5 max-h-5",
            },
            withBorder: {
                true: "border-2 border-white",
            },
        },
        defaultVariants: {
            variant: "default",
            withBorder: false,
        },
    },
);

type PersonAvatarProps = VariantProps<typeof avatarVariants> & {
    src: string | null | undefined;
    altText: string;
};

export default function PersonAvatar({
    altText,
    src,
    variant,
    withBorder,
}: PersonAvatarProps) {
    return (
        <div className={cn(avatarVariants({ variant, withBorder }))}>
            {src ? (
                <Image
                    src={src}
                    layout="fill"
                    alt={altText}
                    className="h-full w-full object-cover"
                />
            ) : (
                <PlaceholderPerson />
            )}
        </div>
    );
}
