import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Nav from "@/components/Nav.client";
import Footer from "@/components/Footer.client";
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
      <body className={`${IBM_PLEX_SANS.className}  antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
