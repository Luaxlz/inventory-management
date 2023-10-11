"use client";
import {
  Alert,
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
import { Box, bgcolor } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const ProductModal = ({
  product,
  fetchProducts,
  openModal,
  handleCloseModal,
}) => {
  const backgroundPaper = common.white;
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    // TODO: Create delete function with validation in product quantity
    formik.resetForm();
    setConfirmDelete(false);
    handleCloseModal();
  };

  const handleSave = async (values) => {
    //TODO: Create save functionality
    formik.resetForm();
    handleCloseModal();
  };

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        supplier: product.supplier,
        model: product.model,
        inventoryLocation: product.inventoryLocation,
        quantity: product.quantity,
      });
    }
  }, product);

  const formik = useFormik({
    initialValues: {
      name: "",
      supplier: "",
      model: "",
      inventoryLocation: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      supplier: Yup.string(),
      model: Yup.string().required(),
      inventoryLocation: Yup.string().required(),
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
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              name="name"
              value={formik.values.name}
              label="Nome do Produto"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="supplier"
              value={formik.values.supplier}
              label="Fornecedor"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="model"
              value={formik.values.model}
              label="Modelo do Produto"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="inventoryLocation"
              value={formik.values.inventoryLocation}
              label="Localização no Estoque"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              name="quantity"
              value={formik.values.quantity}
              label="Quantidade em Estoque"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
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
              {product && (
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
            <Button onClick={handleDelete}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};
