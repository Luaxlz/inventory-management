import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: "100%",
        mt: 2,
        mb: 2,
        "&:hover": { cursor: "pointer" },
      }}>
      <CardContent>
        <Stack
          alignItems={"flex-start"}
          direction="row"
          justifyContent="space-between"
          spacing={1}>
          <Stack spacing={1} sx={{ maxWidth: 50 }}>
            <Stack spacing={1}>
              <Typography variant="p">{product.name}</Typography>
            </Stack>
          </Stack>

          <Stack spacing={1}>{product.quantity}</Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
