# Prerequisites ----

Your associated TRACT tenant must be configured with a Cybersource payment gateway with an account
that has 3D secure processing enabled.

#Instructions

1. Run application from /payments.js/examples/3d-secure-cybersource folder with <your-tract-domain> as parameter
    * node app.js foo.tractbilling.com
    
2. Retrieve a referrer token from the TRACT API        

3. Navigate to test page
    * http://localhost:1111/index.html?t=d88f9360-e192-412e-8892-9f5adb24e844

4. Fill out sample data.  
    * Use Visa Card 4111111111111111 with current or future expiration date
    * Enter any address information
    * Hit Submit button

Remaining TBD --
