export async function getAllProducts() {
  try {
    const data = await fetch("/api/product", {
      method: "GET",
    }).then((response) => response.json());

    return data;
  } catch (error) {
    console.error(error);
  }
}
