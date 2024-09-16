import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const separatorVariants = cva(
    "aspect-[16/1] w-fit mx-auto rounded-full overflow-hidden bg-gradient-to-r from-gradientPink to-gradientBlue",
    {
        variants: {
            size: {
                default: "h-1",
            },
        },
    },
);

type SeparatorProps = VariantProps<typeof separatorVariants>;

function Separator({ size = "default" }: SeparatorProps): JSX.Element {
    return <div className={cn(separatorVariants({ size }))}></div>;
}

export default Separator;
