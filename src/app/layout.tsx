import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/navigation/top-nav";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = IBM_Plex_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Laptop Spec Advisor",
  description: "Scalable reference system for laptop buying decisions"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)]`}>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
