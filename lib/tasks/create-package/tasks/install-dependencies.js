'use strict';

const childProcess = require('child_process');

module.exports.title = 'Install dependencies';

module.exports.task = ctx => {

	return new Promise((resolve, reject) => {

		const { packageRootDir } = ctx;

		const child = childProcess.spawn('npm', ['install'], {
			cwd: packageRootDir
		});

		child.on('error', reject);

		child.on('exit', (code, signal) => {
			if(code === 0)
				return resolve();

			reject(new Error(`An error ocurred when running npm install. Exit code: ${code} - ${signal}`));
		});
	});
};
