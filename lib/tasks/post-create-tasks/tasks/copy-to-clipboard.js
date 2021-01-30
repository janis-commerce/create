'use strict';

const path = require('path');

const clipboardy = require('clipboardy');
const logger = require('lllog')();

module.exports.title = 'Copy to clipboard';

module.exports.task = async (ctx, task) => {

	const packageRootDir = path.resolve(process.cwd(), ctx.name);

	const openDirectoryCommand = `cd ${packageRootDir}`;
	try {
		await clipboardy.write(openDirectoryCommand);
		task.title = `Run \`${openDirectoryCommand}\` to get started. (it's been copied to you clipboard).`;
	} catch(e) {
		task.title = `Run \`${openDirectoryCommand}\` to get started.`;
		logger.debug(`Failed to copy to clipboard: ${e.stack}`);
		task.skip('Failed to copy to clipboard');
	}
};
