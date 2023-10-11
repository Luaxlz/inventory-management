import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";

export const ProductTable = ({ products, handleProductSelect }) => {
  const handleProductClick = (product) => {
    handleProductSelect(product);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, i) => (
              <TableRow
                hover
                key={product.id}
                sx={{
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => handleProductClick(product)}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.inventoryLocation}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.quantity}</TableCell>
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
