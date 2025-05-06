// Simulador  Carrito v2.0
let productos = [
  {
    id: 1,
    Nombre: "Remera Oversize",
    Talle: "L",
    Stock: 10,
    Precio: 35,
    imagen: "img/SHEIN.jpeg",
  },
  {
    id: 2,
    Nombre: "Buzo Oversize",
    Talle: "L",
    Stock: 10,
    Precio: 60,
    imagen: "img/PULL&BEAR.jpeg",
  },
  {
    id: 3,
    Nombre: "Pantalon Baggy",
    Talle: "L",
    Stock: 10,
    Precio: 53,
    imagen: "img/Homme.jpeg",
  },
  {
    id: 4,
    Nombre: "Remera Boxy Fit",
    Talle: "L",
    Stock: 10,
    Precio: 33,
    imagen: "img/remeraboxy.jpg",
  },
  {
    id: 5,
    Nombre: "Bermuda",
    Talle: "L",
    Stock: 10,
    Precio: 43,
    imagen: "img/bermuda.jpeg",
  },
  {
    id: 6,
    Nombre: "Gorra Chicago Bulls",
    Talle: "L",
    Stock: 10,
    Precio: 180,
    imagen: "img/Gorra.jpeg",
  },
];

let carritoDeCompra = [];

const targetsProductos = (productos) => {
  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach((producto) => {
    let col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.Nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.Nombre}</h5>
          <p class="card-text">Talle: ${producto.Talle}</p>
          <p class="card-text">Precio: $${producto.Precio}</p>
          <p class="card-text">Disponible: <span id="stock-${producto.id}">${producto.Stock}</span></p>
          <button class="btn btn-primary mt-auto" id="agregar-${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
    agregarProductos(producto); // Asocia evento al botón
  });
};

// Asocia el botón "Agregar al carrito"
function agregarProductos(producto) {
  const botonAgregar = document.getElementById(`agregar-${producto.id}`);
  botonAgregar.addEventListener("click", () => {
    if (producto.Stock <= 0) return;

    producto.Stock--;
    carritoDeCompra.push(producto.id); // Solo guardamos ID
    guardarCarrito(); // Guarda el carrito en localStorage
    targetsCarrito(carritoDeCompra);
    actualizarBotonesTienda(); // Refresca los botones
  });
}

// Actualiza el carrito visualmente
const targetsCarrito = (carrito) => {
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
    const subtotal = producto.Precio * producto.cantidad;
    totalGeneral += subtotal;

    const col = document.createElement("div");
    col.className = "col-12";

    col.innerHTML = `
      <div class="card d-flex flex-row justify-content-between align-items-center p-3">
        <img src="https://via.placeholder.com/100" class="me-3" alt="${producto.Nombre}">
        <div class="flex-grow-1">
          <h5>${producto.Nombre}</h5>
          <p>Talle: ${producto.Talle}</p>
          <p>Precio unitario: $${producto.Precio}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm me-2" id="restar-${producto.id}">-</button>
            <span id="cantidad-${producto.id}">${producto.cantidad}</span>
            <button class="btn btn-outline-secondary btn-sm ms-2" id="sumar-${producto.id}">+</button>
          </div>
        </div>
        <div class="text-end">
          <strong>Subtotal: $<span id="subtotal-${producto.id}">${subtotal}</span></strong>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
    EventoSumRestProduct(producto.id);
  });

  document.getElementById("total-general").textContent = totalGeneral;
  actualizarBotonesTienda();
  finalizarCompra();
};

// Sumar y restar productos del carrito
const EventoSumRestProduct = (id) => {
  const productoOriginal = productos.find((p) => p.id === id);

  document.getElementById(`sumar-${id}`).addEventListener("click", () => {
    if (productoOriginal.Stock <= 0) return;
    productoOriginal.Stock--;
    carritoDeCompra.push(id);
    targetsCarrito(carritoDeCompra);
  });

  document.getElementById(`restar-${id}`).addEventListener("click", () => {
    const index = carritoDeCompra.findIndex((prodId) => prodId === id);
    if (index !== -1) {
      productoOriginal.Stock++;
      carritoDeCompra.splice(index, 1);
      guardarCarrito(); // Guarda el carrito en localStorage
      targetsCarrito(carritoDeCompra);
    }
  });
};

// Sincroniza los botones de la tienda con el stock actual
function actualizarBotonesTienda() {
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

// Simula finalización de compra
const finalizarCompra = () => {
  const btnPagar = document.getElementById("btn-pagar");
  if (!btnPagar) return;

  // Elimina cualquier listener anterior para evitar múltiples mensajes
  const nuevoBtnPagar = btnPagar.cloneNode(true);
  btnPagar.parentNode.replaceChild(nuevoBtnPagar, btnPagar);

  nuevoBtnPagar.addEventListener(
    "click",
    () => {
      // Mostrar mensaje de compra
      const mensaje = document.createElement("div");
      mensaje.className = "alert alert-success mt-3";
      mensaje.textContent = "¡Gracias por tu compra!";
      document.body.appendChild(mensaje);

      // Desvanecer y eliminar después de 2 segundos
      setTimeout(() => {
        mensaje.style.opacity = "0";
        setTimeout(() => mensaje.remove(), 500); // Espera a que termine la transición
      }, 500);

      // Restaurar stock
      carritoDeCompra.forEach((id) => {
        const producto = productos.find((p) => p.id === id);
        if (producto) producto.Stock++;
      });

      // Vaciar carrito y actualizar todo
      carritoDeCompra = [];
      guardarCarrito(); // Guarda el carrito vacío en localStorage
      targetsCarrito(carritoDeCompra);
      actualizarBotonesTienda();
    },
    { once: true }
  );
};

const guardarCarrito = () => {
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
  localStorage.setItem("carrito", JSON.stringify(carritoParaGuardar));
};

const cargarCarrito = () => {
  const data = localStorage.getItem("carrito");
  if (data) {
    const productosGuardados = JSON.parse(data);
    productosGuardados.forEach((item) => {
      const original = productos.find((p) => p.id === item.id);
      if (original) {
        for (let i = 0; i < item.cantidad; i++) {
          if (original.Stock > 0) {
            original.Stock--;
            carritoDeCompra.push(original.id);
          }
        }
      }
    });
    targetsCarrito(carritoDeCompra);
    actualizarBotonesTienda();
  }
};

window.onload = () => {
  targetsProductos(productos);
  cargarCarrito(); // 👈 CARGAMOS EL CARRITO DESDE LOCALSTORAGE
};

/* Simulador v1.0
const mostrarMenu = (arr) => {
  let mensaje = `!Bienvenido a la tienda! \n \n`;

  for (let i = 0; i < arr.length; i++) {
    mensaje += `${arr[i].id} - ${arr[i].Nombre}  $${arr[i].Precio} ----- Disponible: ${arr[i].Stock}\n`;
  }

  return mensaje;
};

function mostrarCarrito(arr2) {
  let mensaje = ``;

  for (let i = 0; i < arr2.length; i++) {
    mensaje += `${arr2[i].id} - ${arr2[i].Nombre}  $${arr2[i].Precio}\n`;
  }

  return mensaje;
}

function calcularTotalCarrito(arr2) {
  let Total = 0;
  for (let i = 0; i < arr2.length; i++) {
    Total = arr2[i].Precio + Total;
  }
  return Total;
}

function agregarProductos(arr, arr2) {
  let opcion = +prompt(`${mostrarMenu(arr)}\n Selecciona una opcion de compra`);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].Stock <= 0) {
    } else {
      if (opcion == arr[i].id) {
        arr2.push(arr[i]);
        arr[i].Stock--;
        alert("Agregado con exito");
      }
    }
  }
}

function eliminarProductos(arr, arr2) {
  let opcion = +prompt(
    `${mostrarCarrito(arr2)}\n Selecciona el pructo que desea eliminar`
  );

  for (let i = 0; i < arr2.length; i++) {
    if (opcion === arr2[i].id) {
      arr2.splice(i, 1);

      for (let j = 0; j < arr.length; j++) {
        if (arr[j].id === opcion) {
          arr[j].Stock++;
          break;
        }
      }

      alert("Producto eliminado con exito");
      break;
    }
  }
}

function gestionarCarrito(productos, carrito) {
  if (carrito.length === 0) {
    alert("No hay productos en el carrito");

    if (confirm("¿Desea agregar productos?")) {
      let seguir = 1;
      while (seguir === 1) {
        agregarProductos(productos, carrito);

        let respuesta = prompt("¿Desea seguir comprando? \n 1 - Si \n 2 - No");
        if (respuesta === null || respuesta !== "1") {
          seguir = 0;
        }
      }
    }

    return;
  }

  alert(mostrarCarrito(carrito));

  if (confirm("¿Desea finalizar la compra?")) {
    let total = calcularTotalCarrito(carrito);
    alert(`Total a pagar: $${total}\n¡Gracias por su compra!`);

    // Restaurar el stock de todos los productos comprados
    for (let i = 0; i < carrito.length; i++) {
      const productoComprado = carrito[i];
      const productoOriginal = productos.find(
        (p) => p.id === productoComprado.id
      );
      if (productoOriginal) {
        productoOriginal.Stock++;
      }
    }

    carrito.length = 0; // Vaciar carrito
  }
}

const verEcomerce = () => {
  while (true) {
    let opcion = +prompt(
      "\n Selecciona una opcion: \n 1 - Comprar \n 2 - Ver Carrito \n 3 - Eliminar Producto \n 4 - Salir \n"
    );

    switch (opcion) {
      case 1:
        let seguir = 1;
        while (seguir == 1) {
          agregarProductos(productos, carritoDeCompra);
          seguir = +prompt("Desea seguir comprando? \n 1 - Si \n 2 - No \n");
        }
        break;
      case 2:
        gestionarCarrito(productos, carritoDeCompra);
        break;
      case 3:
        eliminarProductos(productos, carritoDeCompra);
        break;
      case 4:
        alert("Hasta Luego!");
        return; // Salir del bucle y finalizar la función
      default:
        alert("Opcion no valida");
    }
  }
};

Iniciar la tienda verEcomerce();*/
