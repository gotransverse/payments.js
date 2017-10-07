
var state = "success";
$(document).ready(function(){


    $.validator.addMethod("trioDate",function(value, element) {
        return value.match(/^(1[0-2]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/);
    },
    "Please enter a valid date in the format mm/yyyy");


    $.validator.addMethod("tenYears", function(value,element) {

        var dateArray = value.split('/');
        var myDate = new Date(dateArray[1], dateArray[0]);
        var now = new Date();
        var years = now.getFullYear() + 10;   
        var tenYearsLater = new Date();
        tenYearsLater.setFullYear(years);

        if (myDate < tenYearsLater) {
            return true;
        } else {
            return false;
        }
    }, 
    "Expiration date cannot be beyond 10 years from today");

    $.validator.addMethod("expired", function(value,element) {

            var dateArray = value.split('/');
            var myDate = new Date(dateArray[1], dateArray[0]);
            var now = new Date();

            if (myDate < now) {
                    return false;
                } else {
                    return true;
                }
            }, 
            "Expired");

    $.validator.addMethod("cvvLengthCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        if ("AMEX" == type && (value.length != 4)) {
            return false;
        } else if ( ("VISA" == type || "DISCOVER" == type || "MASTERCARD" == type)  && (value.length != 3) ){
            return false;
        } else {
            return true;
        }
    },
    "Invalid Card Verification Number");
    $.validator.addMethod("visaCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        var pattern = /\s|-/g;
        value = value.replace(pattern, "");
        if ("VISA" == type && (!value.match(/^4/) || (value.length != 16)) ) {
            return false;
        } else {
            return true;
        }
    },
    "Invalid Visa card number");
    $.validator.addMethod("amexCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        var pattern = /\s|-/g;
        value = value.replace(pattern, "");
        if ("AMEX" == type && (!value.match(/^3[47]/) || value.length != 15)) {
            return false;
        } else {
            return true;
        }
    },
    "Invalid American Express card number");
    $.validator.addMethod("discoverCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        var pattern = /\s|-/g;
        value = value.replace(pattern, "");
        if ("DISCOVER" == type && (!value.match(/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/) || value.length != 16)) {
            return false;
        } else {
            return true;
        }
    },
    "Invalid Discover card number");
    $.validator.addMethod("mastercardCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        var pattern = /\s|-/g;
        value = value.replace(pattern, "");
        if ("MASTERCARD" == type && (!value.match(/^5[1-5]/) || value.length != 16)) {
            return false;
        } else {
            return true;
        }
    },
    "Invalid Mastercard card number");
    $.validator.addMethod("tract-card-typeCheck", function(value,element) {
        var type = $("#card_type").val().toUpperCase();
        var pattern = /\s|-/g;
        value = value.replace(pattern, "");
        if ("VISA" == type && (!value.match(/^4/) || value.length != 16)) {
            return false;
        } else if ("AMEX" == type && (!value.match(/^3[47]/) || value.length != 15)) {
            return false;
        } else if ("DISCOVER" == type && (!value.match(/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/) || value.length != 16)) {
            return false;
        } else if ("MASTERCARD" == type && (!value.match(/^5[1-5]/) || value.length != 16)) {
            return false;
        } else {
            return true;
        }
    },
    "Invalid Card Number");
    $.validator.addMethod("utf8Email", function(value, element) {
            // check for whitespace/unprintable Ascii
            var pos = value.search(/[\x00-\x20]/g);
            if (pos >=0) return false;

            // replace any remaining characters with an 'a' to validate
            var acsiiOnlyValue = value.replace(/[^\x21-\x7e]/g, "a");

            return this.optional(element)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(acsiiOnlyValue);}
            , "Please enter a valid email address.");



    function addRules(rulesObj){
        for (var item in rulesObj){
            $('#'+item).rules('add',rulesObj[item]);  
        } 
    }

    function removeRules(rulesObj){
        for (var item in rulesObj){
            $('#'+item).rules('remove');  
        } 
    }
    
    $("#payment_form").validate({
        rules:{
            addressPostalCode: {
                required: true,
                zipcodeUS: true
            },

            "card_type": "required",           
            "first_name": "required",
            "last_name": "required",
            "token": "required",
            "card_number": {
                required: true,
                creditcard: true,
                visaCheck: true,
                amexCheck: true,
                discoverCheck: true,
                mastercardCheck: true
            },
            cardExpiration: {
                required: true,
                trioDate: true,
                tenYears: true,
                expired: true
                
            },
            "cvv": {
                required: true,
                digits: true,
                cvvLengthCheck: true
            },
            "email": {
               "utf8Email": true,
               required: true 
            },
            "date": {
                "trioDate": true,
                "tenYears": true,
                "expired":true
            }
        },   
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                state = "failed";
            } else {
                state = "success";
            }
        } 
    });


});
