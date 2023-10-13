import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";

export const ProductCard = ({ product, handleMobileAction }) => {
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
              <Typography variant="p">{product.name}</Typography>
            </Stack>
          </Stack>
          <Stack spacing={1}>{product.quantity}</Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}>
            <IconButton
              sx={{ p: 0 }}
              onClick={(e) => {
                e.preventDefault;
                handleMobileAction(product, "income");
              }}>
              <NorthEastIcon color="success" />
            </IconButton>
            <IconButton
              sx={{ p: 0 }}
              onClick={(e) => {
                e.preventDefault;
                handleMobileAction(product, "outcome");
              }}>
              <SouthWestIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
