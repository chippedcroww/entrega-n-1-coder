export async function obtenerProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error("Error en la API:", error);
    return [];
  }
}
