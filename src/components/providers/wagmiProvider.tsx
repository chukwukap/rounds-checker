"use client";

import { WagmiProvider as WagmiProviderWrapper } from "wagmi";
import config from "@/wagmi";

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProviderWrapper config={config}>{children}</WagmiProviderWrapper>
  );
};
