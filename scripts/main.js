import { obtenerProductos } from "./api.js";
import { targetsProductos } from "./productos.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  if (!productos.length) {
    console.warn("No se encontraron productos");
    return;
  }
  targetsProductos(productos);
});

export function agregarAlCarrito(productoId) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
