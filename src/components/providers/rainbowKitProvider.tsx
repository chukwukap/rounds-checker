import { RainbowKitProvider as RainbowKitProviderWrapper } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

export const RainbowKitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RainbowKitProviderWrapper>{children}</RainbowKitProviderWrapper>;
};
