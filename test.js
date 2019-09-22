
const hash = require('./index.js'),
	assert = require('assert');

hash('./index.js').then((res) => {
	assert.equal(res, '06dea52826eb8e810458ce7fe3f2cfbefffd6b6022350e711dad8456d53fc12f');
	return hash('./.github', {raw: true, max: 5});
}).then((res) => {
	for (let i in res) {
		assert.equal(typeof res[i], 'string');
		assert.equal(typeof i, 'string');
		console.log(i, res[i]);
	}
	return hash('./.github', {max: 5});
}).then((res) => {
	assert.equal(res, 'cc5c36cda8b118de227ddc7cd9ba38b472686a8e52b7a0bdc1ac82ff91a350a5');
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
