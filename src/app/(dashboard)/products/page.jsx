"use client";
import { ProductCardList } from "@/components/Product/ProductCardList";
import { ProductModal } from "@/components/Product/ProductModal";
import { ProductTable } from "@/components/Product/ProductTable";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Input,
  Pagination,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Stack, Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { ProductManageModal } from "@/components/Product/ProductManageModal";

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
  const [productManagementModalIsOpen, setProductManagementModalIsOpen] =
    useState(false);
  const [actionType, setActionType] = useState(null);

  const fetchProducts = async () => {
    return products;
  };

  const handleProductSelect = (product, action) => {
    setActionType(action);
    setSelectedProduct(product);
    setProductManagementModalIsOpen(true);
  };

  const handleProductSettings = (product) => {
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
            <Grid item xs={12}>
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
                      maxHeight: "100%",
                      alignItems: "center",
                      gap: "10px",
                    }}>
                    <Stack sx={{ flexDirection: "row" }}>
                      {!selectedProduct && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: mdUp ? "row" : "column",
                            justifyContent: lgUp ? "center" : "flex-end",
                            gap: "10px",
                          }}>
                          <Button
                            variant="contained"
                            onClick={() => setProductModalIsOpen(true)}>
                            Cadastrar Produto
                          </Button>
                          <TextField
                            name="product-search-bar"
                            value={""}
                            label="Pesquisar produtos"
                            variant="outlined"
                            type="search"
                            size="small"
                          />
                        </div>
                      )}
                    </Stack>
                  </Box>

                  {mdUp ? (
                    <ProductTable
                      handleProductSelect={handleProductSelect}
                      handleProductSettings={handleProductSettings}
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
      <ProductManageModal
        sx={{ width: { xs: "100%", sm: "50%" }, height: "auto" }}
        openModal={productManagementModalIsOpen}
        product={selectedProduct}
        action={actionType}
        fetchProducts={fetchProducts}
        handleCloseModal={() => {
          setActionType(null);
          setProductManagementModalIsOpen(false);
          setSelectedProduct(null);
        }}
      />
    </>
  );
}
