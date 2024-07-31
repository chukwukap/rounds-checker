import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, base } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Rounds Checker",
  projectId: "c4f79cc821944d9680842e34466bfb",
  chains: [mainnet, base],
  ssr: true,
});

export default config;
