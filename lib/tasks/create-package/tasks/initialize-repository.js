'use strict';

const childProcess = require('child_process');

module.exports.title = 'Initialize repository';

module.exports.task = ctx => {

	return new Promise((resolve, reject) => {

		const { packageRootDir } = ctx;

		const child = childProcess.spawn('git', ['init'], {
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
