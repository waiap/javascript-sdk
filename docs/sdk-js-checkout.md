---
id: sdk-js-checkout
title: Uso en la página de pago
---

import PaymentWall from "../components/PaymentWall.jsx";

Para su uso en la página de pago deberemos de hacer uso de la función `checkout()`, la cuál tendremos disponible una vez tengamos disponible el cliente. A su vez la función `checkout()` tiene disponibles métodos los cuales son obligatorios para el correcto funcionamiento del Payment Wall

## Métodos principales

- `amount()`: Utilizado para establecer la cantidad a pagar por el cliente. Debe ser un número con dos decimales.
- `currency()`: Utilizado para establecer la moneda con la que se va a pagar. Debe seguir el estándar **ISO 4217**.
- `groupId()`: Utilizado para establecer el identificador del cliente. Para clientes no registrados se debe pasar 0.
- `validateForm()`: Utilizado para pasar una referencia a una función que devuelve `true` o `false` en función del estado de validación del formulario de compra.
- `backendUrl()`: Utilizado para pasar la URL a las que el Payment Wall realizará las peticiones.

```js
const client = new PWall('sandbox', false);
function validateCheckout(){
  //Do some validation stuff
  ...
  return true;
};

const client = new PWall('sandbox', true);
const checkout = client.checkout()
  .appendTo("#payment-form")
  .backendUrl("https://mi-sitio-web/controllador")
  .validateForm(this.validateCheckout)
  .amount(1.00)
  .currency("EUR")
  .groupId(0)
  .init();
```


## Configuración avanzada

Para páginas de pago en las que hay varios métodos de pago, formularios de dirección que requieren ser válidados antes de poder pagar se puede hacer uso de las siguientes funciones adicionales, que ayudarán a tener un mayor control sobre cuando se muestra el Payment Wall para poder realizar el pedido:

### submitButton()

Este método se encarga de ocultar el botón de realización de pedido de la página de método de pago, si lo hubiera, en caso de que el método de pago Waiap este seleccionado.

El método de pago Payment Wall realiza la autorización de venta necesaria en el backend de la aplicación, donde se debe formalizar el pedido.

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
.submitButton('#placeOrder')
```

### validateField()

Está función se encarga de ayudar en la validación de campos. Como primer argumento se debe pasar el campo que se debe validar y como segundo argumento se puede pasar una función de validación o bien `required`, que indica que el campo simplemente debe tener un valor.
```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
.validateFields({
        "#firstname" : "required", //La validación comprobaría que este campo tiene un valor
        "#email" : this.validateEmail //Pasa la referencia de una función que valida un email
})
```

Para facilitar la tarea de validación, el SDK de Javascript para Payment Wall incluye algunas funciones de validaciones de campos que ayudan al desarrollador, estas funciones son:

- `PWall.VALIDATE_MIN_LENGTH(length)`: valida que la longuitud mínima del campo sea la requerida por el parámetro `length`.
- `PWall.VALIDATE_EMAIL(email)`: valida que el campo tenga un mail con un formato estándar, como por ejemplo mail@example.com.

### on()

Esta función es la encargada de llamar a funciones callback aportadas por el desarrollador para informar de cientos eventos que ocurren durante el funcionamiento del Payment Wall, estos eventos son:

- `beforeValidation`: Este evento es llamado antes de realizar la validación de formulario, campos y selección del método de pago Payment Wall.
- `afterValidation`: Este evento es llamado después de realizar la validación de formulario, campos y selección del método de pago Payment Wall.
- `paymentOk`: Este evento es llamado una vez que el Payment Wall confirma que el pago ha sido correcto.
- `paymentKo`: Este evento es llamado una vez que el Payment Wall comprueba que el pago no ha sido efectuado correctamente.

Un ejemplo de uso de este método sería el siguiente:

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
  .on("beforeValidation", () => {console.log("BEFORE VALIDATION CALLBACK")})
  .on("afterValidation", () => { console.log("AFTER VALIDATION CALLBACK") })
  .on("paymentOk", () => {console.log("PAYMENT OK CALLBACK")})
  .on("paymentKo", () => {console.log("PAYMENT KO CALLBACK")})
```

### init()

Aunque el Payment Wall se renderiza una vez todas las condiciones de validación, selección y métodos obligatorios han sido satisfechos es posible que el método de pago se renderize, por ejemplo, en un modal que se genera dinámicamente. 

Es por esto que se incluye este método init para renderizar el Payment Wall de manera manual. Este método debe ser llamado el último en la sucessión de llamadas de funciones del SDK de Javascript con el fin de garantizar que el correcto funcionamiento.

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
  .appendTo("#backoffice-form")
  .backendUrl("https://mi-sitio-web/controllador")
  .validateForm(this.validate)
  .validateFields({
    "#firstname" : PWall.VALIDATE_MIN_LENGTH(5),
    "#email" : PWall.VALIDATE_EMAIL
  })
  .on("beforeValidation", () => {console.log("BEFORE VALIDATION CALLBACK")})
  .on("afterValidation", () => { console.log("AFTER VALIDATION CALLBACK") })
  .on("paymentOk", () => {console.log("PAYMENT OK")})
  .on("paymentKo", () => {console.log("PAYMENT KO")})
  .amount(1.00)
  .currency("EUR")
  .groupId(0)
  .init();
```


