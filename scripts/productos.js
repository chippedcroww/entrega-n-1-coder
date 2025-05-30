import { actualizarBotonesTienda } from "./ui.js";

function targetsProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach((producto) => {
    let col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">Categoría: ${producto.category}</p>
          <p class="card-text">Precio: $${producto.price}</p>
          <button class="btn btn-primary mt-auto" id="agregar-${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `;

    contenedor.appendChild(col);

    // Agregar evento al botón
    const botonAgregar = col.querySelector(`#agregar-${producto.id}`);
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  });
}

function agregarAlCarrito(producto) {
  if (producto.Stock <= 0) return;

  // Disminuir stock localmente
  producto.Stock--;

  // Leer carrito actual
  let carritoDeCompra =
    JSON.parse(localStorage.getItem("carritoDeCompra")) || [];

  // Buscar si el producto ya existe
  const existente = carritoDeCompra.find((p) => p.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carritoDeCompra.push({ id: producto.id, cantidad: 1 });
  }

  // Guardar carrito actualizado
  localStorage.setItem("carritoDeCompra", JSON.stringify(carritoDeCompra));

  // Actualizar botones (por ejemplo para mostrar "Sin stock")
  actualizarBotonesTienda(producto);
}

export { targetsProductos, agregarAlCarrito };
