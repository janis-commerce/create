#!/bin/env node

'use strict';

const logger = require('lllog')();
const yargs = require('yargs');

const createCommand = require('./create');
const openInIDE = require('./open-in-ide');

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
			.option('remote-type', {
				alias: 'r',
				type: 'string',
				choices: ['http', 'ssh'],
				description: 'How do you want git remote to be configured',
				default: 'ssh'
			})
			.option('github-username', {
				alias: 'u',
				type: 'string',
				description: 'Your github username to set in the remote (http only)',
				default: ''
			})
			.option('verbose', {
				alias: 'V',
				type: 'boolean',
				description: 'Run with verbose logging'
			})
			.group('description', 'Personalization:')
			.group('remote-type', 'Git configuration:')
			.group('github-username', 'Git configuration:')
			.group('verbose', 'Debugging:');
	}, async options => {
		await createCommand(options);
		await openInIDE(options);
	})
	.version()
	.help('help')
	.alias('h', 'help')
	.alias('v', 'version');

module.exports = argv;
