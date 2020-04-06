---
id: sdk-js
title: Introduction
---

In this documentation we will explain the use of the JavaScript SDK, for the documentation on the PHP SDK go to the following [link.](https://github.com/waiap/php-sdk/blob/master/README_EN.MD)  

## Requirements

The library should be required, as fas as possible, in the head tag of the page, along with the styles and application.

``` html
<link rel="stylesheet" href="https://sandbox.sipay.es/pwall_app/css/app.css">
<script src="https://sandbox.sipay.es/pwall_sdk/pwall_sdk.bundle.js"></script>
<script src="https://assets-sipay.s3-eu-west-1.amazonaws.com/sdk-js/pwall-app.min.js"></script>
```

It is recommended to download it from the build/ folder and host it on the merchant's server.

## Usage

Once the library has been imported, we can use the `PWall` function, which will allow us to access to the SDK client. This function has two parameters which are:

- `Entorno`: or Envrionment, with only two possible values: `sandbox` for test payments that will not be chargend and `live` for payments when you are ready to receive orders and payments.
- `Debug`: a `boolean`, depending on whether we need logs in the browser console or not.

An example of use for a test environment would be as follows:

```js
const client = new PWall('sandbox', false);
```

The Payment Wall cen be used in two ways, in the backouffice and on the payment page. This is why the client allows its use in both modes, which are detailed in the following sections.

### Use in the backoffice

For examples of use in the backoffice use the following [link.](docs/sdk-js-backoffice_EN.md) 

### Use on the payment page

For examples of use on the payment page use the following [link.](docs/sdk-js-checkout_EN.md) 
