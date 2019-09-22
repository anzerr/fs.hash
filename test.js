
const hash = require('./index.js'),
	assert = require('assert');

hash('./index.js').then((res) => {
	assert.equal(res, '06dea52826eb8e810458ce7fe3f2cfbefffd6b6022350e711dad8456d53fc12f');
}).catch((err) => {
	console.log(err);
	process.exit(1);
});

hash('./.github', {max: 5}).then((res) => {
	assert.equal(res, '9d54a120e944e07fbc8924581be5b68d35762a591672e0a34bdef7b8fb5576c5');
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
