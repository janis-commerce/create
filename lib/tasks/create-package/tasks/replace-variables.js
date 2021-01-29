'use strict';

const path = require('path');

const fs = require('fs-extra');
const startcase = require('lodash.startcase');
const klaw = require('klaw');

const getRecursiveFilePaths = initialPath => {
	return new Promise((resolve, reject) => {
		const items = [];
		klaw(initialPath)
			.on('data', item => {
				if(item.stats.isFile())
					items.push(item.path);
			})
			.on('end', () => resolve(items))
			.on('error', err => reject(err));

	});
};

const replaceFileContent = async (filepath, replacements) => {
	const fileContent = await fs.readFile(filepath, 'utf-8');
	const newContent = Object.entries(replacements)
		.reduce((content, [key, value]) => {
			return content.replace(new RegExp(`{{${key}}}`, 'g'), value);
		}, fileContent);

	return fs.writeFile(filepath, newContent);
};

const fixUnderscoredFilenames = rootDir => {

	const filesToFix = [
		'_package.json',
		'_.gitignore'
	];

	return Promise.all(filesToFix.map(fileToFix => {
		const actualName = path.resolve(rootDir, fileToFix);
		const expectedName = path.resolve(rootDir, fileToFix.substring(1));
		return fs.move(actualName, expectedName);
	}));
};

module.exports.title = 'Replace variables';

module.exports.task = async ctx => {

	const { packageRootDir, name, description } = ctx;
	const packageNameInHumanCase = startcase(name);

	const replacements = {
		packageNameInKebabCase: name,
		packageNameInTitleCase: packageNameInHumanCase.replace(/ /g, ''),
		packageNameInHumanCase,
		packageDescription: description || ''
	};

	const filepaths = await getRecursiveFilePaths(packageRootDir);

	await Promise.all(filepaths.map(filepath => replaceFileContent(filepath, replacements)));

	return fixUnderscoredFilenames(packageRootDir);
};
