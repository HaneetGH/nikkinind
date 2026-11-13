import type { Metadata } from "next";
import { Geist_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NikkiNind — Handloom house",
    template: "%s · NikkiNind",
  },
  description:
    "NikkiNind sells our own handloom weaves and curated partner brands. Each piece has its own page and scroll story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
