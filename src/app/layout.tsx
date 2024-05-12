import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next";
import NextAuthSessionProvider from "@/components/provider/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SoGame",
    description: "Your painel of favorite games",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NextAuthSessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </NextAuthSessionProvider>
        </body>
        </html>
    );
}
