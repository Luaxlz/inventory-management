"use client";
import { ProductCardList } from "@/components/Product/ProductCardList";
import { ProductSettingsModal } from "@/components/Product/ProductSettingsModal";
import { ProductTable } from "@/components/Product/ProductTable";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Stack, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ProductTransactionModal } from "@/components/Product/ProductTransactionModal";
import { getAllProducts } from "@/utils/products-utils";

export default function Products() {
  const lgUp = useMediaQuery("(min-width:1200px)");
  const mdUp = useMediaQuery("(min-width:900px)");

  const [selectedTransactionProduct, setSelectedTransactionProduct] =
    useState(null);
  const [selectedSettingsProduct, setSelectedSettingsProduct] = useState(null);
  const [productTransactionIsOpen, setProductTransactionIsOpen] =
    useState(false);
  const [productSettingsIsOpen, setProductSettingsIsOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const { products, totalPages } = await getAllProducts(filterProduct, page);
    setProducts(products);
    setTotalPages(totalPages);
  };

  const handleProductAction = (product, action) => {
    setActionType(action);
    setSelectedTransactionProduct(product);
    setProductTransactionIsOpen(true);
  };

  const handleProductSettings = (product) => {
    setSelectedSettingsProduct(product);
    setProductSettingsIsOpen(true);
  };

  const handleCloseModal = async () => {
    setSelectedTransactionProduct(null);
    setSelectedSettingsProduct(null);
    setActionType(null);
    setProductSettingsIsOpen(false);
    setProductTransactionIsOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [filterProduct, page]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //py: 2,
        }}>
        <Container
          maxWidth="xl"
          sx={{ p: 0, maxHeight: "850px", overflowY: "auto" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
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
                      maxWidth: "600px",
                      alignItems: "center",
                      gap: "10px",
                    }}>
                    <Stack sx={{ flexDirection: "row", width: "100%" }}>
                      {!selectedTransactionProduct &&
                        !selectedSettingsProduct && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: mdUp ? "row" : "column",
                              justifyContent: lgUp ? "center" : "flex-end",
                              gap: "10px",
                              width: "100%",
                            }}>
                            <Button
                              sx={{
                                height: "45px",
                                p: 0,
                                width: "175px",
                                fontSize: "0.7rem",
                              }}
                              variant="contained"
                              onClick={async (e) => {
                                e.preventDefault;
                                setProductSettingsIsOpen(true);
                              }}>
                              Cadastrar Produto
                            </Button>
                            <Autocomplete
                              sx={{
                                "& .MuiInputBase-root": { height: "45px" },
                              }}
                              fullWidth
                              id="product-select"
                              options={products}
                              getOptionLabel={(product) => product.name}
                              value={filterProduct}
                              onChange={(_, newValue) => {
                                setFilterProduct(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{
                                    height: "45px",
                                  }}
                                  {...params}
                                  label="Pesquisar produto"
                                />
                              )}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value?.id
                              }
                            />
                          </div>
                        )}
                    </Stack>
                  </Box>
                  {mdUp ? (
                    <ProductTable
                      handleProductAction={handleProductAction}
                      handleProductSettings={handleProductSettings}
                      products={products || []}
                    />
                  ) : (
                    <ProductCardList
                      products={products || []}
                      handleProductAction={handleProductAction}
                      handleProductSettings={handleProductSettings}
                    />
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    {totalPages > 1 && (
                      <Pagination
                        onChange={(_e, value) => {
                          setPage(value);
                        }}
                        count={totalPages}
                        size="small"
                      />
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Product Transaction Modal is used on income/outcome operations on products OR when adding a new product */}
      <ProductSettingsModal
        sx={{ width: { xs: "100%", sm: "50%" }, height: "auto" }}
        openModal={productSettingsIsOpen}
        settingsProduct={selectedSettingsProduct}
        fetchProducts={fetchProducts}
        handleCloseModal={() => {
          setSelectedSettingsProduct(null);
          setProductSettingsIsOpen(false);
          setActionType(null);
        }}
      />
      {/* Product Settings Modal is used only when updating a specific product to perform CRUD operations */}
      <ProductTransactionModal
        sx={{ width: { xs: "100%", sm: "50%" }, height: "auto" }}
        openModal={productTransactionIsOpen}
        transactionProduct={selectedTransactionProduct}
        action={actionType}
        fetchProducts={fetchProducts}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
