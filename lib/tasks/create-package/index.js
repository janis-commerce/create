'use strict';

const path = require('path');

const Listr = require('listr');

const tasks = require('./tasks');

module.exports.title = 'Create package';

module.exports.task = (ctx, task) => {

	task.title = `Create package '${ctx.name}'`;

	ctx.packageRootDir = path.resolve(process.cwd(), ctx.name);

	return new Listr([
		tasks.validatePackageDirectory,
		tasks.copyTemplate,
		tasks.replaceVariables,
		tasks.initializeRepository,
		tasks.installDependencies
	]);
};
