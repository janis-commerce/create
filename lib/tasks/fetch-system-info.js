'use strict';

const envinfo = require('envinfo');

module.exports.title = 'Fetch system info';

module.exports.task = async (ctx, task) => {
	const env = await envinfo.run({
		Binaries: ['Node', 'npm']
	}, { json: true, showNotFound: true });

	const {
		Binaries: {
			Node: node,
			npm
		}
	} = JSON.parse(env);

	ctx.versions = {
		node: node.version,
		npm: npm.version
	};

	task.title = `Running on Node v${node.version} and using npm v${npm.version}`;
};
