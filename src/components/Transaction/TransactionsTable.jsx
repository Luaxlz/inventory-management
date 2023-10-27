import {
  IconButton,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  SvgIcon,
} from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";

import { Box } from "@mui/system";
import { format } from "date-fns";

export const TransactionTable = ({ transactions, handleTransactionSelect }) => {
  return (
    <Box sx={{ minWidth: 800, mt: 2 }}>
      {transactions?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#1976D2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Produto
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Qtde. Movimentada
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Data
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Responsável
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Tipo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, i) => (
              <TableRow
                onClick={() => handleTransactionSelect(transaction)}
                hover
                key={transaction.id}
                sx={{
                  "&:hover": { cursor: "pointer" },
                }}>
                <TableCell>{transaction.Product.name}</TableCell>
                <TableCell>{transaction.quantityInAction}</TableCell>
                <TableCell>
                  {format(new Date(transaction.transactionDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    {transaction.actionType === "income" ? (
                      <NorthEastIcon color="success" />
                    ) : (
                      <SouthWestIcon color="error" />
                    )}
                  </SvgIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography sx={{ mt: 8 }} align="center">
          Ops! Nenhuma movimentação encontrada.
        </Typography>
      )}
    </Box>
  );
};
