import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const ProductTable = ({ products, handleProductSelect }) => {
  const handleProductClick = (product) => {
    handleProductSelect(product);
  };

  return (
    <Box sx={{ minWidth: 800, mt: 2 }}>
      {products?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="asc">Produto</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                hover
                key={product.id}
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => handleProductClick(product)}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.inventoryLocation}</TableCell>
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
