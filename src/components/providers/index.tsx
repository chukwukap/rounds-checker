"use client";
import { RootStoreProvider } from "./zustandStoresProvider";
import { TanstackQueryProvider } from "./tanstackQueryProvider";
import { RainbowKitProvider } from "./rainbowKitProvider";
import { ThemeProvider } from "./themeProvider";
import { ThemeProviderProps } from "next-themes/dist/types";
import { WagmiProvider } from "./wagmiProvider";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <TanstackQueryProvider>
        <WagmiProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </WagmiProvider>
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
