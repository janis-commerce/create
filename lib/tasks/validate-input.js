'use strict';

const assert = require('assert');

const NODE_MIN_VERSION = 10;

module.exports.title = 'Validate input';

module.exports.task = (ctx, task) => {

	task.output = 'Validating node version...';
	const nodeVersionParts = ctx.versions.node.split('.');
	if(Number(nodeVersionParts[0]) < NODE_MIN_VERSION)
		throw new Error(`Node version ${NODE_MIN_VERSION} or newer is required.`);

	task.output = 'Validating package name...';
	assert(ctx.name, 'Missing or empty package name');
};
