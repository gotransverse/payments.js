# Overview
The examples provided in this project are meant to illustrate how to utilize the TRACT 
Payments Service backend to implement browser based payment flows to meet your business needs.

All flows require an initial authenticated call to TRACT via a secure mechanism to retrieve a 
referrer token.  This referrer token is short lived and allows a developer to make calls against the TRACT Payment
service in an unauthenticated manner from a client browser.

# Prerequisites 
* node.js is installed on your environment

    * See https://nodejs.org/en/download/
    * Tested with node version 8.6.0 

* Navigate to root /payments.js folder and do the following

    * npm install
    * This will install all the requirements required to run the samples.

* A TRACT tenant

    * goTransverse Customer Support will provide the domain name for your TRACT instance
    * goTransverse Customer Support will provide an api account for you TRACT tenant.
    
    
# Getting A Referrer Token

Using a tool like Postman, do the following

## URL

    POST https://<your-tract-domain>/t/s/r/1.28/payments/referrerToken

##Request Headers
    
### Authorization    
    Authorization: Basic <auth> 
    
    Where <auth> is the base64 encoded <your-username>:<your-password>

### Content-Type
    
    Content-Type: application/xml
    
##Request Body

    <?xml version="1.0" encoding="UTF-8"?>
    <generatePaymentCollectionReferrerToken xmlns="http://www.tractbilling.com/billing/1_28/domain">
        <errorUrl>http://www.yahoo.com?error</errorUrl>
        <cancelUrl>http://www.yahoo.com?cancel/</cancelUrl>
        <completeUrl>http://www.yahoo.com?complete/</completeUrl>
    </generatePaymentCollectionReferrerToken>        

##Response Body
        
    <?xml version="1.0" encoding="UTF-8"?>
    <referrer xmlns="http://www.tractbilling.com/billing/1_28/domain" referrerToken="d88f9360-e192-412e-8892-9f5adb24e844"/> 
