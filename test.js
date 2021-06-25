
const hash = require('./index.js'),
	assert = require('assert');

const test = (type, value) => {
	return hash('./index.js', {type: type}).then((res) => {
		assert.equal(res, value[0]);
		return hash('./.github', {raw: true, max: 5, type: type});
	}).then((res) => {
		for (let i in res) {
			assert.equal(typeof res[i], 'string');
			assert.equal(typeof i, 'string');
			console.log(i, res[i]);
		}
		return hash('./.github', {max: 5, type: type});
	}).then((res) => {
		assert.equal(res, value[1]);
	});
};

test('sha256', [
	'7fc583efb73c67edc77138f05430605091cfea33deb7614a50f3ee520fca04a8',
	'5d524a3adc4e4b4a0f5f6f423d44d3bec1463e9f8aa4fa1814b08b0fd727988e'
]).then(() => {
	return test('sha1', [
		'4037abd730e09292cea9b2f65f3c6793e3b50238',
		'985d32568ab85eb147819cea74bc9850ff4b1437'
	]);
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
