let productos = [
  {
    id: 1,
    Nombre: "Remera Oversize",
    Talle: "L",
    Stock: 10,
    Precio: 35,
  },
  {
    id: 2,
    Nombre: "Buzo Oversize",
    Talle: "L",
    Stock: 10,
    Precio: 60,
  },
  {
    id: 3,
    Nombre: "Pantalon Baggy",
    Talle: "L",
    Stock: 10,
    Precio: 53,
  },
  {
    id: 4,
    Nombre: "Remera Boxy Fit",
    Talle: "L",
    Stock: 10,
    Precio: 33,
  },
  {
    id: 5,
    Nombre: "Bermuda",
    Talle: "L",
    Stock: 10,
    Precio: 43,
  },
];

let carritoDeCompra = [];

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

// Iniciar la tienda
verEcomerce();
