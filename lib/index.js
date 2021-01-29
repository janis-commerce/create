#!/bin/env node

'use strict';

const logger = require('lllog')();
const yargs = require('yargs');

const createCommand = require('./create');

const loggerMiddleware = options => {
	if(options.verbose)
		logger.setMinLevel('debug');
};

const { argv } = yargs
	.middleware(loggerMiddleware, true)
	.env('JANISCOMMERCE_CREATE')
	.command('* <name>', 'Create a package', command => {
		command
			.positional('name', {
				describe: 'The name of the new package',
				type: 'string'
			})
			.option('description', {
				alias: 'd',
				type: 'string',
				description: 'The description of the package',
				default: ''
			})
			.option('verbose', {
				alias: 'v',
				type: 'boolean',
				description: 'Run with verbose logging'
			});
	}, createCommand)
	.help('help');

module.exports = argv;
