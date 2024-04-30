import "~/styles/globals.css";

import { Poppins } from "next/font/google";

import { type Metadata } from "next";
import { getServerAuthSession } from "~/server/auth";
import Navbar from "./_components/Navbar/Navbar";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    adjustFontFallback: false,
});

export const metadata: Metadata = {
    title: { template: "%s | Watchd", default: "Watchd" },
    description: "Extending your movie experience in ways you can't imagine.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    appleWebApp: {
        statusBarStyle: "black-translucent",
        capable: true,
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();

    return (
        <html lang="en">
            <body
                className={`flex h-device w-screen flex-col bg-secondary font-sans text-white ${poppins.variable} overscroll-none`}
            >
                <Navbar
                    isAuthenticated={!!session}
                    profilePictureUrl={session?.user.image ?? null}
                />
                <div className="flex-grow">{children}</div>
            </body>
        </html>
    );
}
