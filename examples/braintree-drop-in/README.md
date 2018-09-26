# Prerequisites

Your associated TRACT tenant must be configured with a Braintree payment gateway and credit card tokenization must be turned on. 

# Instructions

1. Run application from /payments.js/examples/braintree-drop-in folder with TRACT's submit braintree nonce as the parameter.
   Alternatively, a environment variable named TRACT_URL can be set with this value.
    * node app.js https://tract-qa2.gotransverse.com/t/s/p/1.0/hosted-payment/submitBraintreeNonce
    
2. Retrieve a referrer token from the TRACT API        

POST https://tract-qa2.gotransverse.com/billing/2/payments/generate-token
```javascript
{
  "error_url": "http://yahoo.com",
  "cancel_url": "http://cnn.com",
  "complete_url": "http://google.com"
}
```

3. Navigate to test page, passing in the referrer token with the "t" URL parameter
    * http://localhost:1111/index.html?t=d88f9360-e192-412e-8892-9f5adb24e844

4. Select Credit Card or PayPal (please note to use PayPal your Braintree test account must be linked to your PayPal test account)  
    * Use Visa Card 4111111111111111 with current or future expiration date
    * If using PayPal you will need to enter in the email address and password of a 'buyer' you created in the PayPal sandbox
    * Hit Test Transaction

5. You will be returned to the "successURL" specified in the referrer token request. The reference key will be appended to the url. The parameter name is "rk".

6. Add the new referenced payment method

POST https://tract-qa2.gotransverse.com/billing/2/billing-accounts/302/recurring-payments

```javascript
{
  "payment_method": {
    "payment_method_type": "referenced",
    "reference_key":"6ce1b31c-e119-4c8f-b341-6e68aca347ae"
  }
}
```

7. The response will be like the below. Your payment method is now ready.

```javascript
{
    "id": "471",
    "payment_method": {
        "payment_method_type": "tokenized-paypal",
        "id": "2068",
        "token": "244117836",
        "custom_field_values": [],
        "multi_factor_auth": false,
        "token_two": "cwbmxc"
    },
    "billing_account": {
        "id": "302",
        "account_num": "182",
        "external_account_num": null
    },
    "valid_from": "2018-09-26T12:29:48-05:00",
    "auto_payment": true
}
```

