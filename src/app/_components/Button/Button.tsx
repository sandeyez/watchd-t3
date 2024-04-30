"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import RenderInWrapperIf from "../RenderInWrapperIf/RenderInWrapperIf";

const buttonVariants = cva(
    "flex items-center justify-center whitespace-nowrap rounded-md animation-lift text-sm font-medium ring-offset-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r to-gradientBlue font-bold from-gradientPink text-primary-foreground hover:bg-primary/90",
                outline:
                    "bg-transparent text-white hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-white text-black font-bold hover:bg-slate-100",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);
export interface ButtonProps
    extends HTMLMotionProps<"button">,
        VariantProps<typeof buttonVariants> {
    tooltip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, tooltip, ...props }, ref) => {
        return (
            <RenderInWrapperIf
                condition={!!tooltip}
                wrapper={(children) => (
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger asChild>{children}</TooltipTrigger>
                            <TooltipContent side="bottom" align="center">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            >
                <motion.button
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    whileHover={{
                        scale: 1.1,
                        translateY: -2,
                        transition: {
                            ease: "easeIn",
                            duration: 0.1,
                        },
                    }}
                    {...props}
                />
            </RenderInWrapperIf>
        );
    },
);
Button.displayName = "Button";

export default Button;
