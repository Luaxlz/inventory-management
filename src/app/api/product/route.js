import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, params) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ data: { products } }, { status: 200 });
  } catch (error) {
    console.log("Erro ao buscar produtos: ", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos: " },
      { status: 500 }
    );
  }
}
