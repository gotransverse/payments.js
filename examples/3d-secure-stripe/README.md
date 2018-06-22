# Prerequisites

Your associated TRACT tenant must be configured with a Stripe payment gateway with an account
that has 3D secure processing enabled. Credit card tokenization must be turned on. A webhook
must be configured in the Stripe dashboard.

# Instructions

1. Run application from /payments.js/examples/3d-secure-stripe folder with TRACT's Stripe Submit endpoint as the parameter.
   Alternatively, a environment variable named TRACT_URL can be set with this value.
    * node app.js https://tract-qa2.gotransverse.com/t/s/p/1.0/hosted-payment/submitStripeSource
    
2. Retrieve a referrer token from the TRACT API        

3. Navigate to test page, passing in the referrer token with the "t" URL parameter
    * http://localhost:1111/index.html?t=d88f9360-e192-412e-8892-9f5adb24e844

4. Fill out sample data.  
    * Use Visa Card 4000000000003063 with current or future expiration date
    * Enter any address information
    * Hit Submit button

5. You will be returned to the "successURL" specified in the referrer token request. The reference key will be appended to the url. The parameter name is "rk".

6. Add the new reference credit card payment method

			POST https://tract-qa2.gotransverse.com/t/s/r/1.33/billingAccounts/302/addRecurringPayment

			<addRecurringPaymentToBillingAccount>
          		<billingAccount eid="302"/>
          		<recurringPayment>
            		<referencedCreditCardPaymentMethod referenceKey="4c4f357d-e8f8-4eff-a78d-96959cfc8300"/>
          		</recurringPayment>
    		</addRecurringPaymentToBillingAccount>

7. Retrieve the payment method eid of the newly added tokenized credit card payment method by querying recurring payments. Please note this is the eid of
the tokenizedCreditCardPaymentMethod element and not of the recurringPayment element.

			GET https://tract-qa2.gotransverse.com/t/s/r/recurringPayments?billingAccountEid=302

8. Initiate a 3D Secure payment with the following API call, specifying the URL the user should return to after completing the 3D process.

			POST https://tract-qa2.gotransverse.com/t/s/r/1.33/billingAccounts/302/createThreeDPayment

      		<createThreeDPayment>
        		<threeDPayment returnUrl="http://google.com" applyAutomatically="true" amount="12.00" >
					<billingAccount eid="302"/>
					<tokenizedCreditCardPaymentMethod eid="1719"/>
				</threeDPayment>
      		</createThreeDPayment>

9. A redirectURL will be returned. This URL should be displayed to the user so they can complete the 3D Secure transaction. The transaction can be completed by selecting to either authorize or decline the transaction on the page displayed to the user. The payment will be in a status of EXTERNAL REVIEW till the 3D flow is completed or expires.

			
          	<createThreeDPaymentResponse>
               <threeDPayment redirectUrl="https://hooks.stripe.com/redirect/authenticate/src_1Cba7sAy0nzSWXrAJs0X0pyG?client_secret=src_client_secret_D1dOB7Sbfx2JU6IQ5xQlUqz3" returnUrl="http://google.com" refundedAmount="0.00" canceledAmount="0.00" amount="12.00" reference="src_1Cba7sAy0nzSWXrAJs0X0pyG" occurredOn="2018-06-10T15:27:00.387-05:00" useRecurringPayment="true" status="EXTERNAL_REVIEW" unappliedAmount="12.00" eid="2063" queryScope="SHALLOW">
                  <billingAccount eid="302" queryScope="EID"/>
                  <tokenizedCreditCardPaymentMethod eid="1722" queryScope="EID"/>
                  <refunds pageNumber="1" pageSize="0" totalElements="0" elementCount="0" totalPages="1"/>
               </threeDPayment>
            </createThreeDPaymentResponse>

10. Shortly after approving the 3D Secure flow, if the webhook is configured correctly, TRACT will receive an event indicating that 3D Secure Transaction was approved. TRACT will then call Stripe to charge the card and the payment will transition to COMPLETED. If the 3D Secure transaction is declined or times out (one hour time limit), then TRACT will receive an event indicating a failure and the payment will transition to PROCESSING_ERROR.

# The Webhook

To configure the webhook in Stripe, please follow the instructions below.

1. Log in to the Stripe dashboard for the Stripe account you are using.

2. In the left side menu, click on the "Webhook" link under "Developers".

3. Click the "Add Endpoint" buttong on the top right of the list of Endpoints.

4. Enter in the URL the webhook events should be sent. The example below is for the goTransverse QA environment. Your tenant id is required.

     https://tract-qa2.gotransverse.com/t/s/i/1.0/stripeEvent/sourceChargable?tenant=5

6. From the "Filter Events" radio buttons, select the option "select types to send".

7. Enable the following three events by checking them on the list of filter events: source.chargeable, source.canceled, source.failed

8. Click the Add Endpoint button. 