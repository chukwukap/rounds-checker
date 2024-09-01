"use client";

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { useRootStore } from "../providers/zustandStoresProvider";
import Loader from "@/components/loader";

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ui } = useRootStore();
  const { isLoading } = ui((state) => state);
  return (
    <>
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        {isLoading && <Loader />}
        <div className=" min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </Providers>
    </>
  );
};

/**
 * Modals go here
 */
