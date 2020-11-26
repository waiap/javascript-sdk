---
id: sdk-js
title: Introducción
---

En esta documentación vamos a explicar el uso del SDK de Javascript, para la documentación sobre el SDK de PHP ir al siguiente [enlace.](https://github.com/waiap/php-sdk)  

## Requisitos

La librería deberá ser requerida, en la medida de lo posible, en la etiqueta head de la página, junto con los estilos y la aplicación.

``` html
<link rel="stylesheet" href="https://sandbox.sipay.es/pwall_app/css/app.css">
<script src="https://sandbox.sipay.es/pwall_sdk/pwall_sdk.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/gh/waiap/javascript-sdk@2.0.1/build/pwall-sdk.min.js"></script>
```

Se recomienda descargarla de la carpeta build/ y alojarla en el servidor del comercio.

## Uso

Una vez importada la librería, podremos utilizar la función `PWall`, que nos permitirá acceder al cliente del SDK. Esta función tiene dos parámetros que son:

- `Entorno`: con solo dos valores posibles, `sandbox` para pagos de pruebas que no serán cobrados y `live` para pagos cuando se este preparado para recibir pedidos y pagos.
- `Debug`: un `booleano`, dependiendo de si necesitamos logs en la consola del navegador.

Un ejemplo de uso para un entorno de pruebas sería el siguiente:

```js
const client = new PWall('sandbox', false);
```

El Payment Wall puede utilizarse de dos maneras, en el backoffice y en la página de pago. Es por esto que el cliente permite su uso en ambos modos, los cuales se detalla su uso en los siguientes apartados. 

### Uso en el backoffice

Para ejemplos de utilización en el backoffice utilizar el siguiente [enlace.](docs/sdk-js-backoffice.md) 

### Uso en la página de pago

Para ejemplos de utilización en la página de pago utilizar el siguiente [enlace.](docs/sdk-js-checkout.md) 
