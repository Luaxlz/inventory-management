export async function getAllProducts(filterProduct, page) {
  const productName = filterProduct ? filterProduct.name : "all";
  try {
    const {
      data: { products, totalPages },
    } = await fetch(`/api/product/?name=${productName}&page=${page}`, {
      method: "GET",
    }).then((response) => response.json());

    return { products, totalPages };
  } catch (error) {
    console.log("Houve um erro ao buscar produtos: ", error);
    throw new Error(error);
  }
}

export async function createProduct(productData) {
  try {
    const postResponse = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(productData),
    }).then((response) => response.json());

    console.log("Resposta do POST: ", postResponse);

    return postResponse;
  } catch (error) {
    console.log("Houve um erro ao criar produto: ", error);
    throw new Error(error);
  }
}

export async function deleteProduct(productId) {
  try {
    const deleteResponse = await fetch(`/api/product/${productId}`, {
      method: "DELETE",
    }).then((response) => response.json());

    return deleteResponse;
  } catch (error) {
    console.log("Houve um erro ao deletar produto: ", error);
    throw new Error(error);
  }
}

export async function updateProduct(productData, id) {
  try {
    const updateResponse = await fetch(`/api/product/${id}`, {
      method: "PATCH",
      body: JSON.stringify(productData),
    }).then((response) => response.json());

    return updateResponse;
  } catch (error) {
    console.log("Houve um erro ao atualizar produto: ", error);
    throw new Error(error);
  }
}
