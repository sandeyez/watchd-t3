import "~/styles/globals.css";

import { Poppins } from "next/font/google";

import { type Metadata } from "next";
import Navbar from "./_components/Navbar";
import RootProviders from "./_providers";

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
    return (
        <html lang="en">
            <body
                className={`flex h-device max-w-full flex-col overflow-x-hidden bg-primary font-sans text-white ${poppins.variable} overscroll-none`}
            >
                <RootProviders>
                    <Navbar />
                    <div className="flex-grow">{children}</div>
                </RootProviders>
            </body>
        </html>
    );
}
