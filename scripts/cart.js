import { obtenerProductos } from "./api.js";
import { actualizarBotonesTienda } from "./ui.js";

let carritoDeCompra = JSON.parse(localStorage.getItem("carritoDeCompra")) || [];

let productos = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    productos = await obtenerProductos();

    productos.forEach((p) => {
      p.Stock = p.Stock ?? 5;
    });

    cargarCarrito(productos);
    targetsCarrito(carritoDeCompra, productos);
    // targetsProductos(productos);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});

// Actualiza el carrito visualmente
const targetsCarrito = (carrito, productos) => {
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  const productosAgrupados = {};

  carrito.forEach((id) => {
    if (!productosAgrupados[id]) {
      const productoOriginal = productos.find((p) => p.id === id);
      productosAgrupados[id] = { ...productoOriginal, cantidad: 0 };
    }
    productosAgrupados[id].cantidad++;
  });

  let totalGeneral = 0;

  Object.values(productosAgrupados).forEach((producto) => {
    const subtotal = producto.price * producto.cantidad;
    totalGeneral += subtotal;

    const col = document.createElement("div");
    col.className = "col-12";

    col.innerHTML = `
  <div class="card d-flex flex-row justify-content-between align-items-center p-3">
    <img src="${producto.image}"  width="200" class="me-3" alt="${
      producto.title
    }">
    <div class="flex-grow-1">
      <h5>${producto.title}</h5>
      <p>Categoría: ${producto.category}</p>
      <p>Precio unitario: $${producto.price}</p>
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-secondary btn-sm me-2" id="restar-${
          producto.id
        }">-</button>
        <span id="cantidad-${producto.id}">${producto.cantidad || 1}</span>
        <button class="btn btn-outline-secondary btn-sm ms-2" id="sumar-${
          producto.id
        }">+</button>
      </div>
    </div>
    <div class="text-end">
      <strong>Subtotal: $<span id="subtotal-${producto.id}">${(
      producto.price * (producto.cantidad || 1)
    ).toFixed(2)}</span></strong>
    </div>
  </div>
`;

    contenedor.appendChild(col);
    EventoSumRestProduct(producto.id);
  });

  document.getElementById("total-general").textContent =
    totalGeneral.toFixed(2);
  actualizarBotonesTienda(productos);
  finalizarCompra();
};

// Sumar y restar productos del carrito
const EventoSumRestProduct = (id) => {
  const productoOriginal = productos.find((p) => p.id === id);

  if (!productoOriginal) {
    console.error(`Producto con ID ${id} no encontrado`);
    return;
  }

  document.getElementById(`sumar-${id}`).addEventListener("click", () => {
    if (productoOriginal.Stock <= 0) {
      alert("No hay más stock disponible");
      return;
    }

    productoOriginal.Stock--; // Disminuir stock
    carritoDeCompra.push(id); // ✅ Agregamos una unidad (aunque ya haya otras)

    guardarCarrito(productos);
    targetsCarrito(carritoDeCompra, productos);
  });

  document.getElementById(`restar-${id}`).addEventListener("click", () => {
    const index = carritoDeCompra.findIndex((prodId) => prodId === id);
    if (index !== -1) {
      productoOriginal.Stock++; // Aumentar stock
      carritoDeCompra.splice(index, 1); // Quitar una unidad

      guardarCarrito(productos);
      targetsCarrito(carritoDeCompra, productos);
    }
  });
};

const guardarCarrito = (productos) => {
  const productosAgrupados = {};

  carritoDeCompra.forEach((id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    if (!productosAgrupados[producto.id]) {
      productosAgrupados[producto.id] = {
        id: producto.id,
        cantidad: 0,
      };
    }
    productosAgrupados[producto.id].cantidad++;
  });

  const carritoParaGuardar = Object.values(productosAgrupados);
  localStorage.setItem("carritoDeCompra", JSON.stringify(carritoParaGuardar));
};

function cargarCarrito(productos) {
  const data = localStorage.getItem("carritoDeCompra");
  carritoDeCompra = []; // limpiamos el array para evitar duplicados

  if (data) {
    const productosGuardados = JSON.parse(data); // [{ id: 1, cantidad: 2 }, ...]

    productosGuardados.forEach((item) => {
      const original = productos.find((p) => p.id === item.id);
      if (original && original.Stock > 0) {
        for (let i = 0; i < item.cantidad; i++) {
          if (original.Stock > 0) {
            original.Stock--;
            carritoDeCompra.push(original.id);
          }
        }
      }
    });

    guardarCarrito(productos); // actualiza el localStorage (opcional)
    actualizarBotonesTienda(productos);
  }
}

// Simula finalización de compra
const finalizarCompra = () => {
  const seccionTotal = document.getElementById("seccion-total");
  const mensajeCarrito = document.getElementById("mensaje-carrito");

  // Limpiar mensaje anterior
  mensajeCarrito.innerHTML = "";

  if (carritoDeCompra.length === 0) {
    // Ocultar la sección total y botón de pagar
    seccionTotal.style.display = "none";

    // Mostrar mensaje centrado
    mensajeCarrito.innerHTML = `
      <div class="alert alert-warning" role="alert">
        Tu carrito está vacío. <a href="index.html" class="alert-link fw-bold">Ir a la tienda</a>.
      </div>
    `;
    return;
  }

  // Si hay productos
  seccionTotal.style.display = "flex";
  mensajeCarrito.innerHTML = "";

  if (carritoDeCompra.length > 0) {
    const btnPagar = document.getElementById("btn-pagar");
    const nuevoBtn = btnPagar.cloneNode(true);
    btnPagar.replaceWith(nuevoBtn);

    nuevoBtn.addEventListener("click", () => {
      // Guardamos el carrito por si se recarga o redirige
      window.open("./checkout.html", "_blank");
    });
  }
};

export {
  carritoDeCompra,
  targetsCarrito,
  EventoSumRestProduct,
  guardarCarrito,
  cargarCarrito,
  finalizarCompra,
};
