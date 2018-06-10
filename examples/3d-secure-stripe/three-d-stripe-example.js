var stripe = Stripe('pk_test_ajmlWgKvIp5PMV0kKqE7phlS');
 var elements = stripe.elements({
  fonts: [
    {
      family: 'Open Sans',
      weight: 400,
      src: 'local("Open Sans"), local("OpenSans"), url(https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3ZBw1xU1rKptJj_0jans920.woff2) format("woff2")',
      unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
    },
  ]
});

var card = elements.create('card', {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#F99A52',
      color: '#32315E',
      lineHeight: '48px',
      fontWeight: 400,
      fontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7DF',
      }
    },
  }
});
card.mount('#card-element');

function setOutcome(result) {

  var form = document.querySelector('form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripe-source');
  hiddenInput.setAttribute('value', result.source.id);
  form.appendChild(hiddenInput);

  var referralToken = GetURLParameter('t');

  hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'tract-referral');
  hiddenInput.setAttribute('value', referralToken);
  form.appendChild(hiddenInput);

  if (result.source.card.three_d_secure != 'not_supported') {
    hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'multi-factor');
    hiddenInput.setAttribute('value', 'true');
    form.appendChild(hiddenInput);
  }


  hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'brand');
  hiddenInput.setAttribute('value', result.source.card.brand);
  form.appendChild(hiddenInput);
  
  hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'lastfour');
  hiddenInput.setAttribute('value', result.source.card.last4);
  form.appendChild(hiddenInput);

  hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'exp-month');
  hiddenInput.setAttribute('value', result.source.card.exp_month);
  form.appendChild(hiddenInput);

  hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'exp-year');
  hiddenInput.setAttribute('value', result.source.card.exp_year);
  form.appendChild(hiddenInput);


  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.source) {
    successElement.querySelector('.token').textContent = result.source.id;
    successElement.classList.add('visible');
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }

  // Submit the form
  form.submit();
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.querySelector('form');

  var firstname = form.querySelector('input[name=cardholder-first-name]').value;
  var lastname = form.querySelector('input[name=cardholder-last-name]').value;
  var address1 = form.querySelector('input[name=cardholder-address1]').value;
  var address2 = form.querySelector('input[name=cardholder-address2]').value;
  var postal = form.querySelector('input[name=cardholder-postal]').value;
  var email = form.querySelector('input[name=cardholder-email]').value;
  var name = firstname + " " + lastname;
  var ownerInfo = {
  owner: {
    name: name,
    address: {
      line1: address1,
      line2: address2,
      postal_code: postal,
    },
    email: email
  },
};

  stripe.createSource(card, ownerInfo).then(setOutcome);
});

function GetURLParameter(sParam) {

  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
