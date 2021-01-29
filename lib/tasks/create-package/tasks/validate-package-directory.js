'use strict';

const { promisify } = require('util');
const { opendir } = require('fs');

const fs = require('fs-extra');

const openDir = promisify(opendir);

module.exports.title = 'Validating package directory';

module.exports.task = async ctx => {

	const exists = await fs.pathExists(ctx.packageRootDir);

	if(!exists)
		return fs.ensureDir(ctx.packageRootDir);

	const dir = await openDir(ctx.packageRootDir);

	const dirIsEmpty = !(await dir.read());

	if(!dirIsEmpty)
		throw new Error(`Package directory '${ctx.packageRootDir}' exists and is not empty!`);
};
