#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('https')
const express = require('express');
const inquirer = require('inquirer');

let opts = {}
if (fs.existsSync(__dirname+'/config.json')){
	opts = { ...require('./config.json')}
}

const argOptions = require('nomnom')
	.options({
		'tract-payments-url': {
			position: 0,
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

opts = {...opts, ...argOptions}	

if (opts.save){
	fs.writeFileSync(__dirname+'/config.json', JSON.stringify({
		'tract-payments-url': opts['tract-payments-url'],
		port: opts.port
	}, undefined, 2))
}

const questions = [{
	type: 'input',
	name: 'username',
	message: 'tract username'
}, {
	type: 'password',
	name: 'password',
	mask: '*',
	message: 'tract password'
}]

if (!opts['tract-payments-url']){
	questions.unshift({
		type: 'input',
		name: 'tract-payments-url',
		message: 'please provide the host to tract'
	})
	
}


const app = express();
inquirer.prompt(questions).then(anwsers => {
	const alloptions = {
		...opts,
		...anwsers
	}

	const reqOptions = {
		hostname: `${alloptions['tract-payments-url']}`,
		path: '/t/s/r/1.28/payments/referrerToken',
		method: 'POST',
		headers: {
			'Content-Type': 'application/xml',
			Authorization:
				'Basic ' + (new Buffer(alloptions.username + ':' + alloptions.password).toString('base64'))
		},
	}
	const tokenExtractor = /referrerToken="(.*?)"/
	console.log('submiting a request: ', JSON.stringify(reqOptions, undefined, 2))
	http.request(reqOptions, res => {
		const data = []
		console.log('in res')
		res.on('data', chunk => {
			data.push(chunk);
		});
		res.on('end', () => {
			const result = data.join('');

			const token = tokenExtractor.exec(result);

			if(token[1]){
				console.log(`referrer token is: ${token[1]}`)
			} else {
				console.error('we coulndt extract the token')
			}

			const index = fs
			.readFileSync(path.join(__dirname, '.', '/index.html'), 'utf-8')
			.replace(/__TRACT_PAYMENTS_URL__/g, alloptions['tract-payments-url']);
		
			app.get('/', function (req, res) { res.send(index) });
			app.get('/index.html', function (req, res) { res.send(index) });
		
			app.use(express.static(__dirname));
			app.use('/', express.static(__dirname + '/../../public'));
		
		
			app.listen(alloptions.port, function() {
				console.log('Started client at http://localhost:' + alloptions.port);
			});
		
		})
	}).write(`
	<?xml version="1.0" encoding="UTF-8"?>
	<generatePaymentCollectionReferrerToken xmlns="http://www.tractbilling.com/billing/1_28/domain">
			<errorUrl>http://www.yahoo.com?error</errorUrl>
			<cancelUrl>http://www.yahoo.com?cancel/</cancelUrl>
			<completeUrl>http://www.yahoo.com?complete/</completeUrl>
	</generatePaymentCollectionReferrerToken>
	`);

})



