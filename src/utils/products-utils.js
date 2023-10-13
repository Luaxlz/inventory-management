export async function getAllProducts() {
  try {
    const data = await fetch("/api/product", {
      method: "GET",
    }).then((response) => response.json());

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(productBody) {
  try {
    const fetchResponse = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(productBody),
    }).then((response) => response.json());

    return fetchResponse;
  } catch (error) {
    console.log("Houve um erro ao criar produto: ", error);
    throw new Error(error);
  }
}
