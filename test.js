
const hash = require('./index.js'),
	assert = require('assert');

hash('./index.js').then((res) => {
	assert.equal(res, '92e31003d5eb291df165047484731e640e08db0422c34efbd9c706141d1304b2');
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
