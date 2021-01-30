'use strict';

const childProcess = require('child_process');
const path = require('path');

const logger = require('lllog')();
const open = require('open');

const programs = {
	VSCODE: 'code',
	SUBLIME_TEXT: 'subl'
};

const checkIfProgramExists = programName => {
	return new Promise(resolve => {

		const child = childProcess.spawn('which', [programName]);

		child.on('error', () => resolve(false));

		child.on('exit', code => {
			if(code === 0)
				return resolve(true);

			resolve(false);
		});
	});
};

const safeOpen = async (...args) => {
	try {
		await open(...args);
	} catch(e) {
		logger.debug(`Failed to open in IDE (${JSON.stringify(args)}): ${e.stack}`);
	}
};

module.exports.title = 'Open in IDE';

module.exports.task = async (ctx, task) => {

	const packageRootDir = path.resolve(process.cwd(), ctx.name);

	const vsCodeIsInstalled = await checkIfProgramExists(programs.VSCODE);
	if(vsCodeIsInstalled) {
		return safeOpen(packageRootDir, {
			app: programs.VSCODE
		});
	}

	const sublimeTextIsInstalled = await checkIfProgramExists(programs.SUBLIME_TEXT);
	if(sublimeTextIsInstalled) {
		return safeOpen(packageRootDir, {
			app: programs.SUBLIME_TEXT
		});
	}

	task.skip('No installed IDE recongnized.');
};
