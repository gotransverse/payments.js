var express = require('express');

var CLIENT_PORT = 1111;
var clientapp = express();
clientapp.use(express.static(__dirname));
clientapp.listen(CLIENT_PORT, function() {
	console.log('Started client at http://localhost:' + CLIENT_PORT);
});