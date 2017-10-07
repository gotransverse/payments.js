$.fn.serializeObject = function () {
 var o = {};
 var a = this.serializeArray();
 $.each(a, function () {
  if (o[this.name] !== undefined) {
    if (!o[this.name].push) {
      o[this.name] = [o[this.name]];
    }
    o[this.name].push(this.value || '');
  } else {
   o[this.name] = this.value || '';
 }
});
 return o;
};

function createPaymentToken(successFunction, errorFunction) {

   var formData = $('#payment_form').serializeObject();
   var json = JSON.stringify(formData);

   //make ajax call
   $.ajax({
    method: "POST",
    url: 'https://' + window.tpu + '/t/s/p/1.0/hosted-payment/reference-cc-payment-method',
    data: json,
    contentType: "application/json"
  }).done(successFunction)
   .fail(errorFunction);
 }


