import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import RouteLoadingBar from "@/components/RouteLoadingBar";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const tobias = localFont({
  variable: "--font-playfair",
  src: [
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-Regular-BF6719af6e0eca4.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-RegularItalic-BF6719af6d05a23.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-Medium-BF6719af6e0f214.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-MediumItalic-BF6719af6e0e1ac.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-SemiBold-BF6719af6d74d2b.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/tobias-font-family/TobiasTRIAL-SemiBoldItalic-BF6719af6dc3f54.otf",
      weight: "600",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "ARK Vision — Dubai Luxury Real Estate",
  description:
    "Dubai's most trusted luxury real estate house, curating extraordinary residences since 1998.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${tobias.variable}`}
    >
      <body className="min-h-screen overflow-x-clip bg-[#080808] text-white/80 antialiased">
        <RouteLoadingBar />
        <Header />
        <main className="pt-16 sm:pt-[72px]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
