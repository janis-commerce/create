'use strict';

const childProcess = require('child_process');
const path = require('path');

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

module.exports = async options => {

	const packageRootDir = path.resolve(process.cwd(), options.name);

	const vsCodeIsInstalled = await checkIfProgramExists(programs.VSCODE);
	if(vsCodeIsInstalled) {
		return open(packageRootDir, {
			app: programs.VSCODE
		});
	}

	const sublimeTextIsInstalled = await checkIfProgramExists(programs.SUBLIME_TEXT);
	if(sublimeTextIsInstalled) {
		return open(packageRootDir, {
			app: programs.SUBLIME_TEXT
		});
	}
};
