'use strict';

const childProcess = require('child_process');

const runProcess = (program, args, options) => {
	return new Promise((resolve, reject) => {

		const child = childProcess.spawn(program, args, options);

		child.on('error', reject);

		child.on('exit', (code, signal) => {
			if(code === 0)
				return resolve();

			reject(new Error(`An error ocurred when running npm install. Exit code: ${code} - ${signal}`));
		});
	});
};

const getRemoteUrl = ({ name, remoteType, githubUsername }) => {
	switch(remoteType) {
		case 'ssh':
			return `git@github.com:janis-commerce/${name}.git`;
		case 'http':
			if(githubUsername)
				return `https://${githubUsername}@github.com/janis-commerce/${name}.git`;
			return `https://github.com/janis-commerce/${name}.git`;
		default:
			throw new Error(`Unknown remote type ${remoteType}`);
	}
};

module.exports.title = 'Initialize repository';

module.exports.task = async ctx => {

	const { packageRootDir } = ctx;

	// Init git repository
	await runProcess('git', ['init'], {
		cwd: packageRootDir
	});

	// Add github remote
	await runProcess('git', ['remote', 'add', 'origin', getRemoteUrl(ctx)], {
		cwd: packageRootDir
	});

	// Add files to git staging
	await runProcess('git', ['add', '.'], {
		cwd: packageRootDir
	});

	// Commit initial status
	await runProcess('git', ['commit', '-m', 'Initial commit'], {
		cwd: packageRootDir
	});
};
