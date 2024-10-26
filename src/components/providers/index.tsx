"use client";

import { ThemeProvider } from "./themeProvider";
import { ThemeProviderProps } from "next-themes/dist/types";
import { OnchainProvider } from "./onchainProviders";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <OnchainProvider>{children}</OnchainProvider>
    </ThemeProvider>
  );
}
