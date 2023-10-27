import { parseISO } from "date-fns";

export async function createTransaction(transactionData) {
  const { transactionDate } = transactionData;
  transactionData.transactionDate = parseISO(transactionDate);
  try {
    const response = await fetch("/api/transaction/", {
      method: "POST",
      body: JSON.stringify(transactionData),
    }).then((response) => response.json());

    return response;
  } catch (error) {
    console.log("Houve um erro ao criar movimentação: ", error);
    throw new Error(error);
  }
}

export async function getAllTransactions(page, month, year, filterTransaction) {
  const productName = filterTransaction
    ? filterTransaction.Product.name
    : "all";
  try {
    const {
      data: { transactions, totalPages, fetchedYears, fetchedMonths },
    } = await fetch(
      `/api/transaction/?page=${page}&month=${month}&year=${year}&productName=${productName}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());

    return { transactions, totalPages, fetchedYears, fetchedMonths };
  } catch (error) {
    console.log("Houve um erro ao buscar transações: ", error);
  }
}
