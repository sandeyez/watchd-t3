import * as React from "react";
import { cn } from "~/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    before?: React.ReactNode;
    after?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, before, after, ...props }, ref) => {
        return (
            <div className="relative h-full w-full">
                <input
                    className={cn(
                        "placeholder:text-muted-foreground flex h-12 w-full rounded-md border-2 border-tertiary bg-primary px-3 py-2 text-sm ring-offset-secondary file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        {
                            "pl-10": before,
                            "pr-10": after,
                        },
                    )}
                    ref={ref}
                    {...props}
                />
                {before && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        {before}
                    </div>
                )}
                {after && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {after}
                    </div>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
