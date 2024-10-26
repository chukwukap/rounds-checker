import { ClientWrapper } from "@/components/layout/clientWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootStoreProvider } from "@/components/providers/zustandStoresProvider";
import "@coinbase/onchainkit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rounds Caster",
  description: "Track your Farcaster rounds participation and earnings",
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
