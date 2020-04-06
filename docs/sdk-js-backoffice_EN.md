---
id: sdk-js-backoffice
title: Use in the backoffice
---

```js
import PaymentWallAdmin from "../components/PaymentWallAdmin.jsx";
```

To use it in the backoffice we must use the backoffice function, which we will have available once we have the client available. The backoffice function also has available methods which are mandatory for the correct functioning of the Payment Wall:

- `backoffice.backendUrl(url)`: The url variable indicates the endpoint where the controller in charge of processing the requests made by the Payment Wall is located.
- `backoffice.appendTo(element)`: The element variable indicates the element from which you want the Payment Wall to hang. It must be an id.
- `backoffice.init()`: Once the endpoint and the parent element have been added with the two previous functions, we use this method to render the Payment Wall.

An example of use would be the following:

```js
const client = new PWall('sandbox', false);
client.backoffice();
  .backendUrl("https://my-website/controller");
  .appendTo("#backoffice-form");
  .init();
```

