import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import '@mysten/dapp-kit/dist/index.css'
import { Providers } from "./providers";


const apTos = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});


export const metadata: Metadata = {
  title: "ArtChain AI",
  description: "Power by Swinburne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${apTos.variable} antialiased`}
      >
        <Providers>
        <Navbar/>
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
