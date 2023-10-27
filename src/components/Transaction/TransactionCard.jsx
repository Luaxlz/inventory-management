import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { format } from "date-fns";

export const TransactionCard = ({ transaction, handleTransactionClick }) => {
  return (
    <Card
      onClick={() => handleTransactionClick(transaction)}
      sx={{
        mt: 2,
        mb: 2,
        "&:hover": { cursor: "pointer", bgcolor: "#e6e6e6" },
        fontSize: 12,
        fontWeight: 600,
        bgcolor: "#f2f2f2",
      }}>
      <CardContent>
        <Stack
          alignItems={"center"}
          direction="row"
          justifyContent="space-between"
          spacing={1}>
          <Stack spacing={1}>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontSize: { xs: "12px" } }}>
                {transaction.Product.name}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1}>
            {format(new Date(transaction.createdAt), "dd/MM/yyyy")}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
