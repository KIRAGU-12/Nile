import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nile — Learn English & Literature",
    template: "%s | Nile",
  },
  description:
    "Nile is a revision and learning platform for the Kenyan Bachelor of Education (Arts) in English and Literature. Lecture notes, set texts, authors, stories and an AI study assistant — all for your course.",
  keywords: [
    "English and Literature",
    "Kenya university",
    "lecture notes",
    "set books",
    "AI tutor",
  ],
  authors: [{ name: "Nile" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme")?.value;
  const dark = theme === "dark";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${
        dark ? "dark" : ""
      }`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 w-full px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-slate-500">
      <p>
        Nile — a study companion for the B.Ed (Arts) in English and Literature.
      </p>
    </footer>
  );
}
