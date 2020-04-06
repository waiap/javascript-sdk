---
id: sdk-js-checkout
title: Use on the payment page
---

```js
import PaymentWall from "../components/PaymentWall.jsx";
```

To use it in the payment page we will have to use the `checkout()` function, which we will have available once we have the client available. Also, the `checkout()` has available methods which are mandatory for the proper funtionaning of the Paymen Wall

## Main methods

- `amount()`: Used to set the amount to be paid by the customer. Must be a numner with two decimals.
- `currency()`: Used to set the currency to be paid with. Must follow the standard **ISO 4217**.
- `groupId()`: Used to set the customer's identifier. For unregistered customer you must pass 0.
- `validateForm()`: Used to pass a reference to a function that returns `true` or `false` depending on the validation status of the purchase form.
- `backendUrl()`: Used to pass the URL to which the Payment Wall will make the requests.

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
  .backendUrl("https://my-website/controller")
  .validateForm(this.validateCheckout)
  .amount(1.00)
  .currency("EUR")
  .groupId(0)
  .init();
```


## Advanced settings

For payment pages where there are several payment methods, address forms that need to be valid before payment the payment can be made you can make use of the following additional features, which will help you to have more control over when the Payment Wall is displayed in roder to place the purchase order.

### submitButton()

This method hides the order placement button on the payment method page - if any - if the Waiap payment method is selected.
The Payment Wall payment method performs the necessary sales authorization in the backend of the application, where the order must be placed.

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
.submitButton('#placeOrder')
```

### validateField()

This function assists in the field validation. As a first argument you must pass the field to be validated and as a second argument you can pass a validation function or `required`, which indicates that the field must have a value.

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
.validateFields({
        "#firstname" : "required", // The validation would check if the field has a value
        "#email" : this.validateEmail // Pass the reference of a function for validate the email
})
```

To facilitate the validation task, the JavaScript SDK for Payment Wall includes some field validation functions for helping the developers. These functions are:

- `PWall.VALIDATE_MIN_LENGTH(length)`: validates the minimum `length` of a parameter.
- `PWall.VALIDATE_EMAIL(email)`: validates if the mail has a standard format such as mail@example.com.

### on()

This function is responsable for calling callback functions provided by the developer to report certain of events that occur during the operations of the Payment Wall. These events are:

- `beforeValidation`: This event is called before validating the form, fields and method selected on the Payment Wall.
- `afterValidation`: This event is called after validating the form, fields and method selected on the Payment Wall.
- `paymentOk`: This event is called once the Payment Wall confirms if the payment has been successful.
- `paymentKo`: This event is called once the Payment Wall confirms if the payment has been NO successful.

An example of the use of those methods would be the following:

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
  .on("beforeValidation", () => {console.log("BEFORE VALIDATION CALLBACK")})
  .on("afterValidation", () => { console.log("AFTER VALIDATION CALLBACK") })
  .on("paymentOk", () => {console.log("PAYMENT OK CALLBACK")})
  .on("paymentKo", () => {console.log("PAYMENT KO CALLBACK")})
```

### init()

Although the Payment Wall is rendered once all the validation, selection and mandatory methods conditions have been met, is possible that the payment methos is rendered, for example, in a dyamically generated modal.

This is why this init method is included to render the Payment Wall manually. This method should be called the last in the succession of function calls of the Javascript SDK in order to ensure the proper functioning.

```js
const client = new PWall('sandbox', true);
const checkout = client.checkout()
  .appendTo("#backoffice-form")
  .backendUrl("https://my-website/controller")
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


