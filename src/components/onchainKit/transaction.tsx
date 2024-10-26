import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
  TransactionToast,
  TransactionToastIcon,
  TransactionToastLabel,
} from "@coinbase/onchainkit/transaction";
import { useAccount } from "wagmi";
import { Card } from "@/components/ui/card";

interface RoundTransactionProps {
  roundAddress: string;
  roundAbi: any[];
  functionName: string;
  args: any[];
  onSuccess?: () => void;
}

export const RoundTransaction = ({
  roundAddress,
  roundAbi,
  functionName,
  args,
  onSuccess,
}: RoundTransactionProps) => {
  const { address } = useAccount();

  const contracts = [
    {
      address: roundAddress,
      abi: roundAbi,
      functionName,
      args,
    },
  ];

  return (
    <Card className="p-4">
      {/* @ts-expect-error - TODO: fix this */}
      <Transaction contracts={contracts} onSuccess={onSuccess}>
        <TransactionButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90" />
        <TransactionSponsor />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
        <TransactionToast>
          <TransactionToastIcon />
          <TransactionToastLabel />
        </TransactionToast>
      </Transaction>
    </Card>
  );
};
