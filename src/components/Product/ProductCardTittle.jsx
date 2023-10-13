import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const ProductCardTittle = () => {
  return (
    <Card
      sx={{
        width: "100%",
        mt: 2,
        mb: 2,
        "&:hover": { cursor: "pointer" },
        fontSize: 12,
        fontWeight: 600,
      }}>
      <CardContent>
        <Stack
          alignItems={"flex-start"}
          direction="row"
          justifyContent="space-between"
          spacing={1}>
          <Stack spacing={1} sx={{ maxWidth: 50 }}>
            <Stack spacing={1}>
              <Typography variant="p">Produto</Typography>
            </Stack>
          </Stack>
          <Stack spacing={1}>Quantidade</Stack>
          <Stack spacing={1}>Ações</Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
