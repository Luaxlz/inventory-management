"use client";
import { ProductCardList } from "@/components/Product/ProductCardList";
import { ProductModal } from "@/components/Product/ProductModal";
import { ProductTable } from "@/components/Product/ProductTable";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Parafuso",
    supplier: "Ferragens do Zé",
    model: "Parafuso N2",
    inventoryLocation: "Prateleira B1",
    quantity: 32,
  },
  {
    id: 2,
    name: "Prego",
    supplier: "Ferragens do Zé",
    model: "Prego cabeça chata",
    inventoryLocation: "Prateleira B2",
    quantity: 11,
  },
  {
    id: 3,
    name: "Porca",
    supplier: "Gralha Verde",
    model: "Porca fixante",
    inventoryLocation: "Prateleira A1",
    quantity: 2,
  },
  {
    id: 4,
    name: "Pneu",
    supplier: "Auto Pneus Zoom",
    model: "Pneu 75/170",
    inventoryLocation: "Prateleira C3",
    quantity: 4,
  },
  {
    id: 5,
    name: "OTDR",
    supplier: "Padaria Sem Pão",
    model: "OTDR de longa distancia 280",
    inventoryLocation: "Prateleira A2",
    quantity: 1,
  },
];

export default function Products() {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const fetchProducts = async () => {
    return products;
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductModalIsOpen(true);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item={true} xs={12}>
              <Card
                sx={{
                  minHeight: "70vh",
                  height: "100%",
                  width: "100%",
                }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: mdUp ? "row" : "column",
                      justifyContent: "space-between",
                      maxHeight: "65px",
                      alignItems: "center",
                      gap: "10px",
                    }}>
                    <Stack sx={{ flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: lgUp ? "flex-end" : "center",
                        }}>
                        {!selectedProduct && (
                          <Button
                            variant="contained"
                            onClick={() => setProductModalIsOpen(true)}
                            sx={{ mb: 2 }}>
                            Cadastrar Produto
                          </Button>
                        )}
                      </div>
                    </Stack>
                  </Box>

                  <Typography sx={{ mt: 8 }} variant="h5">
                    Produtos
                  </Typography>

                  {mdUp ? (
                    <ProductTable
                      handleProductSelect={handleProductSelect}
                      products={products || []}
                    />
                  ) : (
                    <ProductCardList
                      products={products || []}
                      handleProductSelect={handleProductSelect}
                    />
                  )}
                </CardContent>
                {/* <CardActions sx={{ justifyContent: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {totalPages > 1 && (
                      <Pagination
                        onChange={(_e, value) => {
                          SecurityUpdateGood(value);
                        }}
                        count={totalPages}
                        size="small"
                      />
                    )}
                  </Box>
                </CardActions> */}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ProductModal
        sx={{ width: { xs: "100%", sm: "50%" }, height: "auto" }}
        openModal={productModalIsOpen}
        product={selectedProduct}
        fetchProducts={fetchProducts}
        handleCloseModal={() => {
          setProductModalIsOpen(false);
          setSelectedProduct(null);
        }}
      />
    </>
  );
}
