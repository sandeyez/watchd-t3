import { type ReactNode } from "react";
import "./WithGradientBorder.css";

type WithGradientBorderProps = {
    children: ReactNode;
    outerClassName?: string;
    innerClassName?: string;
};

function WithGradientBorder({
    children,
    innerClassName,
    outerClassName,
}: WithGradientBorderProps): JSX.Element {
    return (
        <div className={`card-wrapper h-full w-full ${outerClassName}`}>
            <div className={`card-content ${innerClassName}`}>{children}</div>
        </div>
    );
}

export default WithGradientBorder;
