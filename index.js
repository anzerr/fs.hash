
const util = require('./src/util.js'),
	path = require('path');

const hash = (dir, option = {}) => {
	const out = {}, d = path.resolve(dir);
	return util.hash(d, d, {
		type: option.type || 'sha256',
		max: option.max
	}, out).then(() => {
		return (option.raw) ? out : util.hashJson(out).digest('hex');
	});
};

module.exports = hash;
module.exports.default = hash;
