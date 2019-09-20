
const fs = require('fs.promisify'),
	crypto = require('crypto'),
	path = require('path');

const hash = (dir, type, out) => {
	return fs.access(dir).then(async () => {
		let res = await fs.stat(dir);
		if (res.isDirectory()) {
			let list = await fs.readdir(dir), wait = [];
			for (let i in list) {
				wait.push(hash(path.join(dir, list[i]), type, out));
			}
			return Promise.all(wait);
		}
		return new Promise((resolve, reject) => {
			let hash = crypto.createHash(type);
			fs.createReadStream(dir).pipe(hash)
				.on('error', err => reject(err))
				.on('finish', () => resolve(hash.read()));
		}).then((hash) => {
			out[dir] = hash.toString('hex');
		});
	}).catch((e) => {
		return e;
	});
};

module.exports = (dir, raw = false, type = 'sha256') => {
	const out = {};
	return hash(dir, type, out).then(() => {
		if (raw) {
			return out;
		}
		let o = [];
		for (let i in out) {
			o.push({i: i, data: out[i]});
		}
		o = JSON.stringify(o.sort((a, b) => (a.i > b.i) ? 1 : ((b.i > a.i) ? -1 : 0)));
		const hash = crypto.createHash('sha256');
		hash.update(o);
		return hash.digest('hex');
	});
};
