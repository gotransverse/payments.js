#!/usr/bin/env node

const chalk = require('chalk');

console.log(chalk`
{bold usage:}
executing {underline npm run} will give you a list of samples you can try
to run a specific sample just type 
{underline npm run simple}
where {underline simple} is the name of the sample
`)
