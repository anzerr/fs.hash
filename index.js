
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
			let h = crypto.createHash(type);
			fs.createReadStream(dir).pipe(h)
				.on('error', (err) => reject(err))
				.on('finish', () => resolve(h.read()));
		}).then((h) => {
			out[dir] = h.toString('hex');
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
		o = JSON.stringify(o.sort((a, b) => {
			if (a.i > b.i) {
				return 1;
			}
			return (b.i > a.i) ? -1 : 0;
		}));
		const h = crypto.createHash('sha256');
		h.update(o);
		return h.digest('hex');
	});
};
