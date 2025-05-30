// Tarjetas de prueba de Mercado Pago
//Trajetas de Credito para pruebas:
// Mastercard: 5031 7557 3453 0604, MM/YY: 11/30, CVV: 123
// American 3711 803032 57522, MM/YY: 11/30, CVV: 123
// Visa: 4509 9535 6623 3704, MM/YY: 11/30, CVV: 123
// Tarjetas de Débito para pruebas:
// Mastercard: 5287 3383 1025 3304, MM/YY: 11/30, CVV: 123
// visa: 4002 7686 9439 5619, MM/YY: 11/30, CVV: 123
// Funciona Con DNI 12345678

document.addEventListener("DOMContentLoaded", () => {
  const mensaje = document.getElementById("mensaje");

  // Inicializa Mercado Pago con tu Public Key sandbox
  const mp = new MercadoPago("TEST-d35645cb-7fa6-4470-9f20-d55c8a17614b", {
    locale: "es-AR",
  });

  // Crea y monta el formulario en el div #form-checkout
  const cardForm = mp.cardForm({
    amount: "100.00", // Precio a pagar (puede ser dinámico)
    autoMount: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número de la tarjeta",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/AA",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "CVV",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular de la tarjeta",
      },
      issuer: {
        id: "form-checkout__issuer",
      },
      installments: {
        id: "form-checkout__installments",
      },
      identificationType: {
        id: "form-checkout__identificationType",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
      },
    },

    callbacks: {
      onFormMounted: (error) => {
        if (error) return console.warn("Error al montar el formulario:", error);
        console.log("Formulario Mercado Pago montado");
      },
      onSubmit: (event) => {
        event.preventDefault();

        // Obtiene los datos del formulario
        const cardData = cardForm.getCardFormData();
        console.log("Datos de la tarjeta:", cardData);

        // Simula el pago exitoso
        mensaje.className = "alert alert-success text-center mt-3";
        mensaje.textContent =
          "✅ ¡Pago simulado exitoso! Gracias por tu compra.";

        // Limpia el carrito localStorage (simulando compra completada)
        localStorage.removeItem("carritoDeCompra");

        // Opcional: redirigir luego de 3 segundos
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      },
      onFetching: (resource) => {
        console.log("Cargando recurso:", resource);
      },
    },
  });
});
