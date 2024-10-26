import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "wagmi/chains";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { getConfig } from "@/wagmi";

export function OnchainProvider(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={"jrY4mos7-wh-8MFia-Am2Bii7mGStOxx"}
          // @ts-expect-error - TODO: fix this
          chain={base}
          schemaId={
            "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
          }
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
