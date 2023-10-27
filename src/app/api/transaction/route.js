import { PrismaClient } from "@prisma/client";
import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const transactionBody = await req.json();
  try {
    await prisma.transaction.create({
      data: {
        ...transactionBody,
        transactionDate: new Date(transactionBody.transactionDate),
      },
    });

    return NextResponse.json(
      { data: "Transação criada com sucesso!" },
      { status: 200 }
    );
  } catch (transactionError) {
    console.log("Erro ao criar produto: ", transactionError);
    return NextResponse.json(
      { error: "Erro ao criar produto, ", transactionError },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = +searchParams.get("page");
  const limit = 6;
  const paginationQuery = {
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { transactionDate: "desc" },
  };

  const productName = searchParams.get("productName");

  const transactionMonth = +searchParams.get("month") || new Date().getMonth();
  const transactionYear = +searchParams.get("year") || new Date().getFullYear();
  const startDate = startOfMonth(new Date(transactionYear, transactionMonth));
  const endDate = endOfMonth(new Date(transactionYear, transactionMonth));
  const transactionQuery = {
    where: {
      transactionDate: {
        gte: startDate,
        lt: endDate,
      },
    },
    include: {
      Product: true,
    },
  };

  if (productName && productName != "all") {
    transactionQuery.where.Product = {
      name: {
        equals: productName,
      },
    };
  }

  try {
    const transactionCount = await prisma.transaction.count();

    const transactions = await prisma.transaction.findMany({
      ...transactionQuery,
      ...paginationQuery,
    });

    const fetchedYears = await prisma.transaction
      .findMany({
        distinct: ["transactionDate"],
        orderBy: { transactionDate: "asc" },
      })
      .then((data) => [
        ...new Set(data.map((t) => t.transactionDate.getFullYear())),
      ]);

    const fetchedMonths = await prisma.transaction
      .findMany({
        distinct: ["transactionDate"],
        orderBy: { transactionDate: "asc" },
      })
      .then((data) => [
        ...new Set(data.map((t) => t.transactionDate.getMonth())),
      ]);

    const totalPages = Math.ceil(transactionCount / limit);

    return NextResponse.json(
      { data: { transactions, totalPages, fetchedYears, fetchedMonths } },
      { status: 200 }
    );
  } catch (fetchTransactionsError) {
    console.log("Erro ao buscar transações: ", fetchTransactionsError);
    NextResponse.json(
      { error: "Erro ao buscar transações: ", fetchTransactionsError },
      { status: 500 }
    );
  }
}
