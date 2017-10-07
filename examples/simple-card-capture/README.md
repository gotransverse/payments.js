# Instructions

1. Run application from /payments.js/examples/simple-card-capture folder with <your-tract-domain> as parameter
    * node app.js foo.tractbilling.com
    
2. Retrieve a referrer token from the TRACT API        

3. Navigate to test page
    * http://localhost:1111/index.html?t=d88f9360-e192-412e-8892-9f5adb24e844

4. Fill out sample data.  
    * Use Visa Card 4111111111111111 with current or future expiration date
    * Enter any address information
    * Hit Submit button

5. Receive successful response URL with payment method refrence token in URL
    * e.g. http://localhost:1111/success.html?r=c0294abb-4ca6-4b8b-99c9-3541e5654345
    
This received token can then be used to add this payment method to a billing account later in the flow.