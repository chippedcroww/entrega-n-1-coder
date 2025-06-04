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

  targetsProductos(productos); // Carga los productos en el DOM

  const contenedor = document.querySelector("#contenedor-productos");

  // Esperamos que las imágenes se carguen antes de inicializar Isotope
  imagesLoaded(contenedor, function () {
    const iso = new Isotope(contenedor, {
      itemSelector: ".producto",
      layoutMode: "fitRows", // o 'masonry'
    });

    // Escuchamos los botones de filtro una vez que Isotope está listo
    const botones = document.querySelectorAll(".filtro-btn");
    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Cambiar estilos del botón activo
        botones.forEach((b) => b.classList.remove("btn-primary"));
        botones.forEach((b) => b.classList.add("btn-outline-primary"));
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-outline-primary");

        // Aplicar el filtro en Isotope
        const filterValue = btn.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });
      });
    });
  });
});

export function agregarAlCarrito(productoId) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
