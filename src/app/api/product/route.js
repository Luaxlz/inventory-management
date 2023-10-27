import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productQuery = { where: { deletedAt: null } };
  const name = searchParams.get("name");
  const page = searchParams.get("page");
  const limit = 6;

  if (name && name != "all") {
    productQuery.where.name = name;
  }

  const paginationQuery = {
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { name: "asc" },
  };

  try {
    const productCount = await prisma.product.count(productQuery);

    const products = await prisma.product.findMany({
      ...productQuery,
      ...paginationQuery,
    });

    const totalPages = Math.ceil(productCount / limit);

    return NextResponse.json(
      { data: { products, totalPages } },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erro ao buscar produtos: ", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos: " },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const productBody = await req.json();
  try {
    const newProduct = await prisma.product.create({
      data: productBody,
    });

    return NextResponse.json(
      { data: "Produto criado com sucesso!" },
      { status: 200 }
    );
  } catch (createError) {
    console.log("Erro ao criar produto: ", createError);
    NextResponse.json(
      { error: "Erro ao criar produto, ", createError },
      { status: 500 }
    );
  }
}
