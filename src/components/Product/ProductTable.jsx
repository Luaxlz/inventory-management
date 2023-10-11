import {
  IconButton,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { Box } from "@mui/system";

export const ProductTable = ({
  products,
  handleProductSelect,
  handleProductSettings,
}) => {
  const handleProductClick = (product, action) => {
    if (action === "settings") {
      handleProductSettings(product);
    } else {
      handleProductSelect(product, action);
    }
  };

  return (
    <Box sx={{ minWidth: 800, mt: 2 }}>
      {products?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#1976D2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Produto
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Localização
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Modelo
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Quantidade
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, i) => (
              <TableRow
                hover
                key={product.id}
                sx={{
                  "&:hover": { cursor: "pointer" },
                }}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.inventoryLocation}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <CardActions
                    sx={{
                      justifyContent: "flex-start",
                      p: 0,
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}>
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
                    </Box>
                  </CardActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography sx={{ mt: 8 }} align="center">
          Ops! Nenhum produto encontrado.
        </Typography>
      )}
    </Box>
  );
};
