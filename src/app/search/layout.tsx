import PageContainer from "../_components/PageContainer";

export default async function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <PageContainer>{children}</PageContainer>;
}
