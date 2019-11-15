
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
	'cc5c36cda8b118de227ddc7cd9ba38b472686a8e52b7a0bdc1ac82ff91a350a5'
]).then(() => {
	return test('sha1', [
		'4037abd730e09292cea9b2f65f3c6793e3b50238',
		'00b0ad75d2e74b9c7e46c627344b07965063271d'
	]);
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
