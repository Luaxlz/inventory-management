import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

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
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleProductClick(product, "income");
              }}>
              <NorthEastIcon color="success" />
            </IconButton>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleProductClick(product, "outcome");
              }}>
              <SouthWestIcon color="error" />
            </IconButton>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleProductClick(product, "settings");
              }}>
              <SettingsApplicationsIcon color="primary" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
