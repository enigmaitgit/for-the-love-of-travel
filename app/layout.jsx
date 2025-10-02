import "./globals.css";
import { Inter, Playfair_Display, Roboto } from "next/font/google";
import { defaultMetadata } from "../lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto" 
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={`${inter.variable} ${playfair.variable} ${roboto.variable} bg-white text-brand-ink antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}