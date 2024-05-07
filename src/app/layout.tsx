import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Potty Map",
  description: "Find bathrooms near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      {/* <script src='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js'></script> */}
      <link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body className={inter.className}>
        <ContextProvider>
          {children}
        </ContextProvider>
        </body>
    </html>
  );
}
