import { Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";

export const ProductCardList = ({
  products = [],
  handleProductSelect,
  handleProductSettings,
}) => {
  return (
    <Box>
      {products?.length ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductSelect(product)}
          />
        ))
      ) : (
        <Typography sx={{ mt: 16 }} align="center">
          Ops! Nenhum produto foi encontrado.
        </Typography>
      )}
    </Box>
  );
};
