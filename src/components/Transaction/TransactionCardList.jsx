import { Box, Typography } from "@mui/material";
import { TransactionCardTitle } from "./TransactionCardTitle";
import { TransactionCard } from "./TransactionCard";

export const TransactionCardList = ({
  transactions = [],
  handleTransactionSelect,
}) => {
  const handleTransactionClick = (transaction) => {
    handleTransactionSelect(transaction);
  };
  return (
    <Box sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      {transactions.length > 0 && <TransactionCardTitle />}
      <Box>
        {transactions?.length ? (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              handleTransactionClick={handleTransactionClick}
            />
          ))
        ) : (
          <Typography sx={{ mt: 16 }} align="center">
            Ops! Nenhuma movimentação foi encontrada.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
