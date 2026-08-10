import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Nav from "@/components/layout/Nav.client";
import Footer from "@/components/layout/Footer.client";
import { SeasonProvider } from "./context/SeasonContext";
import SeasonalGradient from "@/components/layout/SeasonalGradient";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leaf Finder",
  description: "Discover parks near you!",
};

const IBM_PLEX_SANS = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SeasonProvider>
        <body
          className={`${IBM_PLEX_SANS.className}  antialiased min-w-full flex flex-col min-h-screen`} //pt-100
        >
          <SeasonalGradient>
            <Nav />
            {children}
            <Footer />
          </SeasonalGradient>
        </body>
      </SeasonProvider>
    </html>
  );
}
