'use strict';

const path = require('path');

const logger = require('lllog')();
const Listr = require('listr');

const tasks = require('./tasks');

module.exports = options => new Listr([
	tasks.fetchSystemInfo,
	tasks.validateInput,
	tasks.createPackage
]).run({
	...options,
	templateDir: path.resolve(__dirname, '..', 'template')
})
	.catch(e => {
		logger.info('💥 Package creation aborted!');
		logger.info(e.message);
		logger.debug(e.stack);
		process.exit(1);
	});
