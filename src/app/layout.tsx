import "~/styles/globals.css";

import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/Navbar/Navbar";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Watchd",
    description: "Extending your movie experience in ways you can't imagine.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col bg-secondary font-sans text-white ${poppins.variable}`}
            >
                <Navbar />
                <div className="flex-grow">
                    <TRPCReactProvider>{children}</TRPCReactProvider>
                </div>
            </body>
        </html>
    );
}
