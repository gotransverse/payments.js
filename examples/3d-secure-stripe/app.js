#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require('express');

let opts = {}
if (fs.existsSync(__dirname+'/config.json')){
    opts = { ...require('./config.json')}
}

const argOptions = require('nomnom')
    .options({
        'tract-payments-url': {
            position: 0,
            required: !process.env.TRACT_URL,
            help: 'the tract payments url, required if there is no TRACT_URL environment variable',
        },
        port: {
            abbr: 'p',
            help: 'port to run the sample on (defaults to 1111)',
            default: 1111,
        }
    })
    .parse();

opts = {...opts, ...argOptions} 

var url;
if (process.env.TRACT_URL) {
    url = process.env.TRACT_URL;
} else {
    url = opts['tract-payments-url'];
}



const app = express();

const index = fs
    .readFileSync(path.join(__dirname, '.', '/index.html'), 'utf-8')
    .replace(/__TRACT_PAYMENTS_URL__/g, url);

app.get('/', function (req, res) { res.send(index) });
app.get('/index.html', function (req, res) { res.send(index) });

app.use(express.static(__dirname));
app.use('/', express.static(__dirname + '/../../public'));


app.listen(opts.port, function() {
    console.log('Started client at http://localhost:' + opts.port);
});
