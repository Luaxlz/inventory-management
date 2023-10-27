import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const TransactionCardTitle = () => {
  return (
    <Card
      sx={{
        width: "100%",
        mt: 2,
        mb: 2,
        fontSize: 12,
        fontWeight: 700,
        background: "#1976D2",
        color: "#fff",
      }}>
      <CardContent>
        <Stack
          alignItems={"flex-start"}
          direction="row"
          justifyContent="space-around"
          spacing={1}>
          <Stack spacing={1}> Produto</Stack>
          <Stack spacing={1}>Data</Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
