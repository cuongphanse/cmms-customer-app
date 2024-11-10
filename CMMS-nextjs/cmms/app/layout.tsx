import localFont, { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionProviders from "@/providers/session-provider";
import { ShoppingContextProvider } from "@/context/shopping-cart-context";
import NextTopLoader from "nextjs-toploader";
const roboto = Roboto({ weight: "400", subsets: ["vietnamese"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "CMMS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <NextTopLoader height={5} />
        <SessionProviders>
          <QueryProvider>
            <ShoppingContextProvider>{children}</ShoppingContextProvider>
            <Toaster />
          </QueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
