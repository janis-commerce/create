'use strict';

const fs = require('fs-extra');

module.exports.title = 'Copy template';

module.exports.task = ctx => {
	return fs.copy(ctx.templateDir, ctx.packageRootDir);
};
