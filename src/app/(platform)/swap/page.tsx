"use client";

import {
  Swap,
  SwapAmountInput,
  SwapButton,
  SwapMessage,
  SwapToggleButton,
} from "@coinbase/onchainkit/swap";
import type { Token } from "@coinbase/onchainkit/token";
import { useAccount } from "wagmi";
import { ConnectWalletButton } from "@/components/connectWalletButton";
import { EnhancedTransactionStatus } from "@/components/onchainKit/transactionStatus";
import { EnhancedTokenSearch } from "@/components/onchainKit/tokenSearch";
import { useState } from "react";

const SwapPage = () => {
  const { address } = useAccount();
  const [txHash, setTxHash] = useState<string | null>(null);

  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  };

  const USDCToken: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  };
  const [fromToken, setFromToken] = useState<Token>(ETHToken);
  const [toToken, setToToken] = useState<Token>(USDCToken);

  const handleFromTokenSelect = (token: Token | null) => {
    if (!token) return;
    if (token.symbol === toToken.symbol) {
      setToToken(fromToken);
    }
    setFromToken(token);
  };

  const handleToTokenSelect = (token: Token | null) => {
    if (!token) return;
    if (token.symbol === fromToken.symbol) {
      setFromToken(toToken);
    }
    setToToken(token);
  };

  const handleToggle = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Swap Tokens</h1>

      {address ? (
        <div className="space-y-8">
          <div className="bg-card rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <EnhancedTokenSearch
                label="From Token"
                selectedToken={fromToken}
                onTokenSelect={handleFromTokenSelect}
              />
              <EnhancedTokenSearch
                label="To Token"
                selectedToken={toToken}
                onTokenSelect={handleToTokenSelect}
              />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6">
            <Swap onSuccess={(receipt) => setTxHash(receipt.transactionHash)}>
              <SwapAmountInput
                label="Sell"
                swappableTokens={[fromToken, toToken]}
                token={fromToken}
                type="from"
              />
              <SwapToggleButton />
              <SwapAmountInput
                label="Buy"
                swappableTokens={[fromToken, toToken]}
                token={toToken}
                type="to"
              />
              <SwapButton className="w-full" />
              <SwapMessage className="mt-4" />
            </Swap>
            {txHash && (
              <EnhancedTransactionStatus
                hash={txHash}
                onSuccess={() => setTxHash(null)}
              />
            )}
          </div>
        </div>
      ) : (
        <ConnectWalletButton />
      )}
    </div>
  );
};
export default SwapPage;
