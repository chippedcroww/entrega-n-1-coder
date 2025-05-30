import { obtenerProductos } from "./api.js";
import { targetsProductos } from "./productos.js";
const iso = new Isotope("#contenedor-productos", {
  itemSelector: ".producto",
  layoutMode: "fitRows",
});

document.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  if (!productos.length) {
    console.warn("No se encontraron productos");
    return;
  }
  targetsProductos(productos);
  const grid = document.querySelector("#contenedor-productos");

  // Instanciamos Isotope
  const iso = new Isotope(grid, {
    itemSelector: ".producto",
    layoutMode: "fitRows",
  });

  // Agregar evento click a botones de filtro
  const botones = document.querySelectorAll(".filtro-btn");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Cambiar estilos de botón activo
      botones.forEach((b) => b.classList.remove("btn-primary"));
      botones.forEach((b) => b.classList.add("btn-outline-primary"));
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-outline-primary");

      // Filtrar Isotope con el filtro del botón
      const filterValue = btn.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });
    });
  });
});

export function agregarAlCarrito(productoId) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
