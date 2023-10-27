"use client";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/utils/products-utils";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { common } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const ProductSettingsModal = ({
  settingsProduct,
  fetchProducts,
  openModal,
  handleCloseModal,
}) => {
  const backgroundPaper = common.white;
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async (product) => {
    const { id } = product;
    try {
      setIsLoading(true);
      await deleteProduct(id);
    } catch (error) {
      console.log("Houve um erro ao deletar produto: ", error);
      throw new Error(error);
    } finally {
      setConfirmDelete(false);
      setIsLoading(false);
      formik.resetForm();
      fetchProducts();
      window.alert("Produto foi deletado com sucesso!");
      handleCloseModal();
    }
  };

  const handleSave = async (values) => {
    if (settingsProduct) {
      const { id } = settingsProduct;
      try {
        setIsLoading(true);
        await updateProduct(values, id);
        window.alert("Produto atualizado com sucesso!");
      } catch (error) {
        console.log("Erro ao criar produto: ", error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
        formik.resetForm();
        fetchProducts();
        handleCloseModal();
      }
    } else {
      try {
        setIsLoading(true);
        await createProduct(values);
        window.alert("Produto criado com sucesso!"); //TODO: Create a basic notification system
      } catch (error) {
        console.log("Erro ao criar produto: ", error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
        formik.resetForm();
        fetchProducts();
        handleCloseModal();
      }
    }
  };

  useEffect(() => {
    if (settingsProduct) {
      formik.setValues({
        name: settingsProduct.name,
        supplier: settingsProduct.supplier,
        brand: settingsProduct.brand,
        model: settingsProduct.model,
        location: settingsProduct.location,
        quantity: settingsProduct.quantity,
      });
    }
  }, [settingsProduct]);

  const formik = useFormik({
    initialValues: {
      name: "",
      supplier: "",
      brand: "",
      model: "",
      location: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      supplier: Yup.string(),
      brand: Yup.string(),
      model: Yup.string(),
      location: Yup.string().required(),
      quantity: Yup.number().required(),
    }),
  });

  return (
    <Modal
      open={openModal}
      onClose={() => {
        formik.resetForm();
        handleCloseModal();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          borderRadius: "12px",
          p: 2,
          bgcolor: backgroundPaper,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}>
        <Box>
          <DialogTitle>
            {settingsProduct ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              id="settings-form-name"
              fullWidth
              name="name"
              value={formik.values.name}
              label="Nome do Produto"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="settings-form-supplier"
              fullWidth
              name="supplier"
              value={formik.values.supplier}
              label="Fornecedor"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="settings-form-brand"
              fullWidth
              name="brand"
              value={formik.values.brand}
              label="Marca"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="settings-form-model"
              fullWidth
              name="model"
              value={formik.values.model}
              label="Modelo do Produto"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="settings-form-location"
              fullWidth
              name="location"
              value={formik.values.location}
              label="Localização no Estoque"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="settings-form-quantity"
              type="number"
              name="quantity"
              value={formik.values.quantity}
              label="Quantidade em Estoque"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              disabled={settingsProduct ? true : false}
            />
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Stack>
              {settingsProduct && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setConfirmDelete(true)}>
                  Excluir
                </Button>
              )}
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <Stack>
                {!isLoading && (
                  <Button
                    onClick={() => {
                      handleCloseModal();
                      formik.resetForm();
                    }}
                    variant="outlined"
                    color="error"
                    sx={{ mr: 1 }}>
                    Cancelar
                  </Button>
                )}
              </Stack>
              <Stack>
                <Button
                  disabled={!formik.isValid}
                  variant="contained"
                  onClick={async () => {
                    await handleSave(formik.values);
                  }}>
                  {isLoading ? (
                    <CircularProgress color="info" size={30} />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </form>
        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
          <DialogTitle>Excluir Produto</DialogTitle>
          <DialogContent>
            <Typography>Quer mesmo excluir esse produto?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
            <Button onClick={() => handleDelete(settingsProduct)}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};
