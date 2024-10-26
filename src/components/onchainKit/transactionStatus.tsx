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
import { Card } from "@/components/ui/card";

interface EnhancedTransactionStatusProps {
  hash: string;
  onSuccess?: () => void;
}

export const EnhancedTransactionStatus = ({
  hash,
  onSuccess,
}: EnhancedTransactionStatusProps) => {
  return (
    <Card className="p-4">
      <Transaction onSuccess={onSuccess}>
        <TransactionStatus>
          <TransactionStatusLabel className="text-sm font-medium" />
          <TransactionStatusAction className="mt-2" />
        </TransactionStatus>
        <TransactionToast position="bottom-right">
          <TransactionToastIcon className="h-5 w-5" />
          <TransactionToastLabel className="ml-2" />
        </TransactionToast>
      </Transaction>
    </Card>
  );
};
