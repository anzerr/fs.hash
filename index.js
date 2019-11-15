
const util = require('./src/util.js'),
	path = require('path');

const hash = (dir, option = {}) => {
	const out = {}, d = path.resolve(dir), type = option.type || 'sha256';
	return util.hash(d, d, {
		type: type,
		max: option.max
	}, out).then(() => {
		let keys = Object.keys(out);
		if (keys.length === 1) {
			return out[keys[0]];
		}
		return (option.raw) ? out : util.hashJson(out, type).digest('hex');
	});
};

module.exports = hash;
module.exports.default = hash;
