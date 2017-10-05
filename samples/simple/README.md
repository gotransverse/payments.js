##Prerequisites
* node.js is installed on your environment (see https://nodejs.org/en/download/)
* express is installed on your environment
    * npm install express

##Instructions
1. Update target URL in source code
    * In tract-hosted-payment.js, line 25, update the URL to your TRACT environment accordingly
        ```
        function createPaymentToken(successFunction, errorFunction) {
        
           var formData = $('#payment_form').serializeObject();
           var json = JSON.stringify(formData);
        
           //make ajax call
           $.ajax({
            method: "POST",
            url: "https://customer-solutions.gotransverse.com/t/s/p/1.0/hosted-payment/reference-cc-payment-method",
            data: json,
            contentType: "application/json"
          }).done(successFunction)
           .fail(errorFunction);
         }
        ```

2. Run application from /HostedPaymentJS folder
    * node app.js
    
3. Retrieve a referrer token from the TRACT API

    *URL*
    
        POST https://customer-solutions.gotransverse.com/t/s/r/1.28/payments/referrerToken
    
    *Authorization*
    
        Basic Auth

    *Request*

        <?xml version="1.0" encoding="UTF-8"?>
        <generatePaymentCollectionReferrerToken xmlns="http://www.tractbilling.com/billing/1_28/domain">
            <errorUrl>http://www.yahoo.com?error</errorUrl>
            <cancelUrl>http://www.yahoo.com?cancel/</cancelUrl>
            <completeUrl>http://www.yahoo.com?complete/</completeUrl>
        </generatePaymentCollectionReferrerToken>        

    *Response*
            
        <?xml version="1.0" encoding="UTF-8"?>
        <referrer xmlns="http://www.tractbilling.com/billing/1_28/domain" referrerToken="d88f9360-e192-412e-8892-9f5adb24e844"/> 
        

4. Navigate to test page
    * http://localhost:1111/form.html?t=d88f9360-e192-412e-8892-9f5adb24e844&a=true

5. Fill out sample data.  
    * Use Visa Card 4111111111111111 with current or future expiration date
    * Hit Submit button

6. Receive successful response URL with payment method refrence token in URL
    * e.g. http://localhost:1111/success.html?r=c0294abb-4ca6-4b8b-99c9-3541e5654345
    
This received token can then be used to add this payment method to a billing account later in the flow.