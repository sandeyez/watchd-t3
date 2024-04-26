import "~/styles/globals.css";

import { Poppins } from "next/font/google";

import Navbar from "./_components/Navbar/Navbar";
import { type Metadata } from "next";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col bg-secondary font-sans text-white ${poppins.variable} overscroll-none`}
            >
                <Navbar />
                <div className="flex-grow">{children}</div>
            </body>
        </html>
    );
}
