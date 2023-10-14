import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const productId = params.id;
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      { data: "Produto deletado com sucesso!" },
      { status: 200 }
    );
  } catch (deleteError) {
    console.log("Erro ao deletar produto: ", deleteError);
    NextResponse.json(
      { error: "Erro ao deletar produto, ", deleteError },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const productId = params.id;
  const productData = await req.json();
  try {
    await prisma.product.update({
      where: {
        id: productId,
        deletedAt: null,
      },
      data: {
        ...productData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { data: "Produto foi atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (updateError) {
    console.log("Erro ao atualizar produto: ", updateError);
    NextResponse.json(
      { error: "Erro ao atualizar produto, ", updateError },
      { status: 500 }
    );
  }
}
