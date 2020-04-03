---
id: sdk-js-backoffice
title: Uso en el backoffice
---

import PaymentWallAdmin from "../components/PaymentWallAdmin.jsx";

Para su uso en el backoffice deberemos de hacer uso de la función backoffice, la cuál tendremos disponible una vez tengamos disponible el cliente. A su vez la función backoffice tiene disponibles métodos los cuales son obligatorios para el correcto funcionamiento del Payment Wall:

- `backoffice.backendUrl(url)`: La variable url indica el endpoint donde se encuetra el controlador encargado de procesar las peticiones realizadas por el Payment Wall.
- `backoffice.appendTo(element)`: La variable element indica el elemento del que se quiere que cuelgue el Payment Wall. Debe ser un id.
- `backoffice.init()`: Una vez añadidos el endpoint y el elemento padre con las dos funciones anteriores, utilizamos este método para renderizar el Payment Wall.

Un ejemplo de uso sería el siguiente:

```js
const client = new PWall('sandbox', false);
client.backoffice();
  .backendUrl("https://mi-sitio-web/controllador");
  .appendTo("#backoffice-form");
  .init();
```

