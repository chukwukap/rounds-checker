import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
  Badge,
} from "@coinbase/onchainkit/identity";

export const EnhancedWallet = () => {
  return (
    <Wallet>
      <ConnectWallet withWalletAggregator>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar>
            <Badge />
          </Avatar>
          <Name />
          <Address className="text-muted-foreground" />
          <EthBalance />
        </Identity>
        <WalletDropdownLink
          icon="wallet"
          href="/swap"
          className="hover:bg-accent"
        >
          Swap Tokens
        </WalletDropdownLink>
        <WalletDropdownLink
          icon="wallet"
          href="/user/dashboard"
          className="hover:bg-accent"
        >
          My Rounds
        </WalletDropdownLink>
        {/* <WalletDropdownLink
          icon="farcaster"
          href="/farcaster/connect"
          className="hover:bg-accent"
        >
          Connect Farcaster
        </WalletDropdownLink> */}
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar>
            <Badge />
          </Avatar>
          <Name />
          <Address className="text-muted-foreground" />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect className="hover:bg-destructive hover:text-destructive-foreground" />
      </WalletDropdown>
    </Wallet>
  );
};
