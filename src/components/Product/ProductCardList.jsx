import { Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { ProductCardTittle } from "./ProductCardTittle";

export const ProductCardList = ({
  products = [],
  handleProductAction,
  handleProductSettings,
}) => {
  const handleMobileAction = (product, action) => {
    handleProductAction(product, action);
  };
  return (
    <Box sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <ProductCardTittle />
      <Box>
        {products?.length ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleMobileAction={handleMobileAction}
            />
          ))
        ) : (
          <Typography sx={{ mt: 16 }} align="center">
            Ops! Nenhum produto foi encontrado.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
