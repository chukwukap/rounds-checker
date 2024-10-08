import { ClientWrapper } from "@/components/layout/clientWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootStoreProvider } from "@/components/providers/zustandStoresProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rounds Checker",
  description: "Track your Farcaster rounds participation and earnings",
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //     { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStoreProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </RootStoreProvider>
      </body>
    </html>
  );
}
