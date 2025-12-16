import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import { NavBar } from "./components/NavBar";
import "@/styles/globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Wnorowski Family Reading Year 2025",
  description: "A cozy home for the Wnorowski family's shared reading memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-amber-50 text-stone-800">
      <body
        className={`${sourceSans.variable} ${merriweather.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 via-amber-50 to-stone-50">
          <NavBar />
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
