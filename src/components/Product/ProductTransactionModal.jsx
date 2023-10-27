"use client";
import { updateProduct } from "@/utils/products-utils";
import { createTransaction } from "@/utils/transaction-utils";
import {
  Button,
  CircularProgress,
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
import { format } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const ProductTransactionModal = ({
  transactionProduct,
  transaction,
  action,
  fetchProducts,
  openModal,
  handleCloseModal,
}) => {
  const backgroundPaper = common.white;
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (values) => {
    const {
      description,
      user,
      quantityInAction,
      quantityInStock,
      transactionDate,
    } = values;
    const productId = transactionProduct.id;
    const transactionData = {
      productId: productId,
      description: description,
      actionType: action,
      quantityInStock: quantityInStock,
      quantityInAction: quantityInAction,
      user: user,
      transactionDate: transactionDate,
    };
    const productData = {
      quantity: quantityInAction,
      actionType: action,
    };
    try {
      setIsLoading(true);
      await createTransaction(transactionData);
      await updateProduct(productData, productId);
      window.alert("Transação criada com sucesso!");
    } catch (error) {
      console.log("Erro ao criar produto: ", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
      formik.resetForm();
      fetchProducts();
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (transactionProduct) {
      formik.setValues({
        name: transactionProduct.name,
        location: transactionProduct.location,
        quantityInStock: transactionProduct.quantity,
      });
    } else if (transaction) {
      const { transactionDate } = transaction;
      const formattedDate = format(new Date(transactionDate), "yyyy-MM-dd");
      formik.setValues({
        name: transaction.Product.name,
        description: transaction.description,
        user: transaction.user,
        location: transaction.Product.location,
        quantityInStock: transaction.quantityInStock,
        quantityInAction: transaction.quantityInAction,
        transactionDate: formattedDate,
      });
    }
  }, [transactionProduct, transaction]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      user: "",
      location: "",
      quantityInStock: "",
      quantityInAction: "",
      transactionDate: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
      user: Yup.string().required(),
      quantityInAction: Yup.number().required(),
      transactionDate: Yup.date().required(),
    }),
  });

  return (
    <Modal
      open={openModal}
      onClose={async () => {
        formik.resetForm();
        await handleCloseModal();
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
          p: 0,
          bgcolor: backgroundPaper,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}>
        <Box>
          <DialogTitle variant="h5">
            {action === "income" ? (
              <Typography
                variant="h5"
                color="green"
                sx={{ fontWeight: "500", m: 0, p: 0 }}>
                Entrada
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color="error"
                sx={{ fontWeight: "500", m: 0, p: 0 }}>
                Saída
              </Typography>
            )}
          </DialogTitle>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              id="transaction-product-name"
              name="name"
              value={formik.values.name}
              label="Nome do Produto"
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              id="transaction-product-description"
              fullWidth
              multiline
              name="description"
              value={formik.values.description}
              label="Descrição"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              disabled={transaction}
            />
            <TextField
              fullWidth
              type="text"
              id="transaction-product-user"
              name="user"
              value={formik.values.user}
              label="Destinatário"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              disabled={transaction}
            />
            <TextField
              id="transaction-product-location"
              fullWidth
              name="inventoryLocation"
              value={formik.values.location}
              label="Localização no Estoque"
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              id="transaction-product-quantityInStock"
              fullWidth
              type="number"
              name="quantityInStock"
              value={formik.values.quantityInStock}
              label={
                transaction
                  ? "Quantidade em estoque no momento da movimentação"
                  : "Quantidade em estoque"
              }
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              id="transaction-product-quantityInAction"
              fullWidth
              type="number"
              name="quantityInAction"
              value={formik.values.quantityInAction}
              label={
                transaction?.actionType === "income"
                  ? "Quantidade que foi inserida"
                  : transaction?.actionType === "outcome"
                  ? "Quantidade que foi retirada"
                  : action === "income"
                  ? "Quantidade a ser inserida"
                  : "Quantidade a ser retirada"
              }
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              disabled={transaction}
            />
            <TextField
              fullWidth
              type="date"
              name="transactionDate"
              value={formik.values.transactionDate}
              label="Data"
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
              disabled={transaction}
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
                    formik.resetForm();
                    handleCloseModal();
                  }}
                  variant="outlined"
                  color="error"
                  sx={{ mr: 1 }}>
                  {transaction ? "Sair" : "Cancelar"}
                </Button>
              </Stack>
              {!transaction && (
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
              )}
            </Stack>
          </DialogActions>
        </form>
      </Box>
    </Modal>
  );
};
