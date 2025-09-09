import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { defaultMetadata } from "../lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-white text-brand-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
