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

export const ProductManageModal = ({
  product,
  action,
  fetchProducts,
  openModal,
  handleCloseModal,
}) => {
  const backgroundPaper = common.white;
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const quantityInActionLabel = () => {
    if (action === "income") {
      return "Quantidade a ser inserida";
    } else return "Quantidade a ser retirada";
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
        inventoryLocation: product.inventoryLocation,
        quantityInStock: product.quantity,
      });
    }
  }, product);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      inventoryLocation: "",
      quantityInStock: "",
      quantityInAction: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      inventoryLocation: Yup.string().required(),
      quantityInStock: Yup.number().required(),
      quantityInAction: Yup.number().required(),
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
            {action === "income" ? (
              <Typography variant="h5" color="green" sx={{ fontWeight: "500" }}>
                Entrada
              </Typography>
            ) : (
              <Typography variant="h5" color="error" sx={{ fontWeight: "500" }}>
                Saída
              </Typography>
            )}
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
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              multiline
              name="description"
              value={formik.values.description}
              label="Descrição"
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
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              type="number"
              name="quantityInStock"
              value={formik.values.quantityInStock}
              label="Quantidade em Estoque"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              type="number"
              name="quantityInAction"
              value={formik.values.quantityInAction}
              label={quantityInActionLabel()}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
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
      </Box>
    </Modal>
  );
};
