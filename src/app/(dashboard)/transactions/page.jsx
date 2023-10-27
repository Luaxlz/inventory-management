"use client";
import { ProductTransactionModal } from "@/components/Product/ProductTransactionModal";
import { TransactionTable } from "@/components/Transaction/TransactionsTable";
import { TransactionCardList } from "@/components/Transaction/TransactionCardList";
import { getAllTransactions } from "@/utils/transaction-utils";
import {
  Autocomplete,
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
import { TransactionMonthSelector } from "@/components/Transaction/TransactionMonthSelector";
import { TransactionYearSelector } from "@/components/Transaction/TransactionYearSelector";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export default function Transactions() {
  const lgUp = useMediaQuery("(min-width:1200px)");
  const mdUp = useMediaQuery("(min-width:960px)");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [transactionMonth, setTransactionMonth] = useState(currentMonth);
  const [transactionYear, setTransactionYear] = useState(currentYear);
  const [yearsOptions, setYearsOptions] = useState(new Date().getFullYear());
  const [monthsOptions, setMonthsOptions] = useState(new Date().getMonth());
  const [filterTransaction, setFilterTransaction] = useState(null);

  const handleTransactionSelect = (transaction) => {
    setSelectedTransaction(transaction);
    setModalIsOpen(true);
  };

  const handleTransactionMonth = (month) => {
    setTransactionMonth(month);
  };

  const handleTransactionYear = (year) => {
    setTransactionYear(year);
  };

  const fetchTransactions = async () => {
    console.log(filterTransaction);
    const { transactions, totalPages, fetchedYears, fetchedMonths } =
      await getAllTransactions(
        page,
        transactionMonth,
        transactionYear,
        filterTransaction
      );
    const sortedMonths = fetchedMonths.sort((a, b) => a - b);
    setMonthsOptions(sortedMonths);
    setYearsOptions(fetchedYears);
    setTransactions(transactions);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, transactionMonth, transactionYear, filterTransaction]);
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
                      maxWidth: "600px",
                      alignItems: "center",
                      gap: "10px",
                    }}>
                    <Stack sx={{ flexDirection: "row", width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: mdUp ? "row" : "column",
                          justifyContent: lgUp ? "center" : "flex-end",
                          gap: "10px",
                          width: "100%",
                        }}>
                        <Stack sx={{ mr: 2 }}>
                          {monthsOptions.length >= 1 && (
                            <TransactionMonthSelector
                              handleTransactionMonth={handleTransactionMonth}
                              options={monthsOptions}
                            />
                          )}
                        </Stack>

                        <Stack sx={{ mr: 2 }}>
                          {yearsOptions.length >= 1 && (
                            <TransactionYearSelector
                              handleTransactionYear={handleTransactionYear}
                              options={yearsOptions}
                            />
                          )}
                        </Stack>

                        <Stack>
                          <Autocomplete
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "38px",
                                width: "275px",
                              },
                            }}
                            fullWidth
                            id="product-select"
                            options={transactions}
                            getOptionLabel={(transaction) =>
                              transaction.Product.name
                            }
                            value={filterTransaction}
                            onChange={(_, newValue) => {
                              setFilterTransaction(newValue);
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
                        </Stack>
                      </div>
                    </Stack>
                  </Box>
                  {mdUp ? (
                    <TransactionTable
                      handleTransactionSelect={handleTransactionSelect}
                      transactions={transactions || []}
                    />
                  ) : (
                    <TransactionCardList
                      transactions={transactions || []}
                      handleTransactionSelect={handleTransactionSelect}
                    />
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
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
      <ProductTransactionModal
        transaction={selectedTransaction}
        openModal={modalIsOpen}
        handleCloseModal={() => {
          setModalIsOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </>
  );
}
