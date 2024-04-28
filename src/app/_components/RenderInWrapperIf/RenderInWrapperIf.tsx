type RenderInWrapperIfProps = {
    condition: boolean;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
};

function RenderInWrapperIf({
    children,
    condition,
    wrapper,
}: RenderInWrapperIfProps): JSX.Element {
    if (!condition) return children;

    return wrapper(children);
}

export default RenderInWrapperIf;
