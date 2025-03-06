import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
// import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets:["latin"],
  weight: ["200","300","400","500","600","700","800"],
  variable: "--font-manrope"
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Placement Manager",
  description: "Created by Ayush Bansal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
