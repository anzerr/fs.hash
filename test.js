
const hash = require('./index.js'),
	assert = require('assert');

hash('./index.js').then((res) => {
	assert.equal(res, '12042995d5d84088ba26aeb4b383ee7f649de4b4872ab03ad2a01185d85f36b0');
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
