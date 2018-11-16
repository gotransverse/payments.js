# Instructions

1. Navigate to /payments.js/examples/simple-card-capture folder 
    * Run `node app.js foo.tractbilling.com`
    
2. Retrieve a referrer token from the TRACT API (see top level README.md file)       

3. Navigate to test page
    * http://localhost:1111/index.html?t=d88f9360-e192-412e-8892-9f5adb24e844

4. Fill out sample data.  
    * Use Visa Card 4111111111111111 with current or future expiration date
    * Enter address information
    * Hit Submit button
    ** This posts to the reference-cc-payment-method endpoint

5. Receive successful response URL with payment method refrence token in URL
    * e.g. http://localhost:1111/success.html?r=c0294abb-4ca6-4b8b-99c9-3541e5654345
    
This received token can then be used to add a 'referenced' payment method to a billing account later. 

```
{
  "payment_method": {
    "payment_method_type": "referenced",
    "reference_key":"f2df446b-7da4-477a-aaed-8c40c93e0809"
  }
}

```
Here is an example response. In this case, we are using a payment processor that supports tokenization and the gateway's tokens that are associated with the payment method are returned and the payment method type is 'tokenized-credit-card'. Non-tokenized credit card payments will have a payment method type of 'credit-card', see the TRACT API documentation for more details.

```
{
    "id": "65152",
    "payment_method": {
        "payment_method_type": "tokenized-credit-card",
        "id": "825700",
        "nickname": "VISA 1111",
        "token": "608438496",
        "custom_field_values": [],
        "multi_factor_auth": false,
        "card_type": "VISA",
        "first_name": "Steve",
        "last_name": "Hall",
        "identifier_number": "Last 4: 1111",
        "expiration_date": "12/2020",
        "last_four": "1111",
        "token_two": "7p8n4h"
    },
    "billing_account": {
        "id": "1483308",
        "account_num": "01E2",
        "external_account_num": null
    },
    "valid_from": "2018-11-15T14:02:14-06:00",
    "auto_payment": true
}

```
