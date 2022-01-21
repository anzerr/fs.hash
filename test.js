
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
	'cb330de9879dd69006570617565f11d8406394b84a865dfc7ea37f7ee4d16bda'
]).then(() => {
	return test('sha1', [
		'4037abd730e09292cea9b2f65f3c6793e3b50238',
		'6588c88fa76297c6695fca0126deb12d8523eccc'
	]);
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
