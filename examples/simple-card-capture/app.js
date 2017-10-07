#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require('express');

let opts = {}
if (fs.existsSync(__dirname+'/config.json')){
	opts = require('./config.json')
} else {
	opts = require('nomnom')
	.options({
		'tract-payments-url': {
			position: 0,
			required: true,
			help: 'the tract payments url',
		},
		port: {
			abbr: 'p',
			help: 'port to run the sample on (defaults to 1111)',
			default: 1111,
		},
		save: {
			abbr: 's',
			help: 'save the config to rc file',
			flag: true
		}
	})
	.parse();
}
if (opts.save){
	fs.writeFileSync(__dirname+'/config.json', JSON.stringify({
		'tract-payments-url': opts['tract-payments-url'],
		port: opts.port
	}, undefined, 2))
}

const app = express();

const index = fs
    .readFileSync(path.join(__dirname, '.', '/index.html'), 'utf-8')
    .replace(/__TRACT_PAYMENTS_URL__/g, opts['tract-payments-url']);

app.get('/', function (req, res) { res.send(index) });
app.get('/index.html', function (req, res) { res.send(index) });

app.use(express.static(__dirname));
app.use('/bootstrap', express.static(__dirname + '/../../bootstrap'));
app.use('/fonts', express.static(__dirname + '/../../fonts'));
app.use('/jquery', express.static(__dirname + '/../../jquery'));


app.listen(opts.port, function() {
	console.log('Started client at http://localhost:' + opts.port);
});
