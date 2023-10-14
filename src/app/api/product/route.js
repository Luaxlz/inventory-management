import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, params) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products }, { status: 200 });
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
