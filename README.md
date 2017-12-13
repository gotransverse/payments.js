# Overview
The examples provided in this project are meant to illustrate how to utilize the TRACT 
Payments Service backend to implement browser based payment flows to meet your business needs.

All flows require an initial authenticated call to TRACT via a secure mechanism to retrieve a 
referrer token.  This referrer token is short-lived and allows a developer to make calls against the TRACT Payment
service in a temporarily authenticated manner from a client browser.  This token can be used only
once to create a temporary payment method in TRACT.  A payment token is provided for this temporary payment
method which is then used to add a payment method to a billing account.

# Prerequisites 
* node.js is installed on your environment

    * See https://nodejs.org/en/download/
    * Tested with node version 8.6.0 

* Required node libraries are installed.

    * Navigate to /payments.js
    * Run `npm install`

* A TRACT tenant

    * goTransverse Customer Support will provide the domain name for your TRACT instance, (e.g. demo.tractbilling.com for the purposes of these examples)
    * goTransverse Customer Support will provide an api account for you TRACT tenant.
    
    
# Getting a Referrer Token

Using a tool like Postman, construct an HTTP post using either JSON REST API or XML REST API.

## JSON REST API Example

```POST https://demo.tractbilling.com/billing/2/payments/generate-token```

### Request Headers

```Authorization: No Auth``` 

```X-api-key: Your provisioned API key```

```Content-Type: application/json```

### Request Body
```
{
  "error_url": "https://gotransverse.com?error",
  "cancel_url": "https://gotransverse.com?cancel",
  "complete_url": "https://gotransverse.com?complete"
}
```

### Response Body
```
{
    "token": "9235d441-edf6-4a76-bcc3-48f2c3ab93cc"
}
```

## XML REST API Example

```POST https://demo.tractbilling.com/t/s/r/1.33/payments/referrerToken```


### Request Headers

```Authorization: Basic <auth>``` 

```Content-Type: application/xml```
    
   Where `<auth>` is the base64 encoded <your-username>:<your-password>

    
### Request Body
```
<?xml version="1.0" encoding="UTF-8"?>
<generatePaymentCollectionReferrerToken xmlns="http://www.tractbilling.com/billing/1_33/domain">
    <errorUrl>http://www.yahoo.com?error</errorUrl>
    <cancelUrl>http://www.yahoo.com?cancel/</cancelUrl>
    <completeUrl>http://www.yahoo.com?complete/</completeUrl>
</generatePaymentCollectionReferrerToken>        
```

### Response Body
```        
<?xml version="1.0" encoding="UTF-8"?>
<referrer xmlns="http://www.tractbilling.com/billing/1_33/domain" referrerToken="d88f9360-e192-412e-8892-9f5adb24e844"/> 
```
