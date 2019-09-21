
const fs = require('fs.promisify'),
	crypto = require('crypto'),
	promise = require('promise.util'),
	path = require('path');

class Util {

	hashFile(file, type) {
		return new Promise((resolve, reject) => {
			let h = crypto.createHash(type);
			fs.createReadStream(file).pipe(h)
				.on('error', (err) => reject(err))
				.on('finish', () => resolve(h.read()));
		});
	}

	hashJson(data) {
		let o = [];
		for (let i in data) {
			o.push({i: i, data: data[i]});
		}
		o = JSON.stringify(o.sort((a, b) => {
			if (a.i > b.i) {
				return 1;
			}
			return (b.i > a.i) ? -1 : 0;
		}));
		const h = crypto.createHash('sha256');
		h.update(o);
		return h;
	}

	hash(abs, dir, option, out) {
		return fs.access(dir).then(async () => {
			let res = await fs.stat(dir);
			if (res.isDirectory()) {
				let list = await fs.readdir(dir), wait = [];
				if (option.max) {
					return promise.each(list, (r) => {
						return this.hash(abs, path.join(dir, r), option, out);
					}, option.max);
				}
				for (let i in list) {
					wait.push(this.hash(abs, path.join(dir, list[i]), option, out));
				}
				return Promise.all(wait);
			}
			return this.hashFile(dir, option.type).then((h) => {
				out[dir.replace(abs, '').replace(/\\+/g, '/')] = h.toString('hex');
			});
		});
	}

}

module.exports = new Util();
