export function actualizarBotonesTienda(productos) {
  if (!Array.isArray(productos)) {
    productos = [productos]; // convierte a array si no lo es
  }

  productos.forEach((producto) => {
    const boton = document.getElementById(`agregar-${producto.id}`);
    const stockSpan = document.getElementById(`stock-${producto.id}`);
    if (boton && stockSpan) {
      stockSpan.textContent = producto.Stock;
      if (producto.Stock <= 0) {
        boton.disabled = true;
        boton.textContent = "Sin stock";
      } else {
        boton.disabled = false;
        boton.textContent = "Agregar al carrito";
      }
    }
  });
}
