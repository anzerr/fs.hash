
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/fs.hash/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/fs.hash/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/fs.hash/workflows/test/badge.svg)

hash a directory or file

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.hash.git
npm install --save @anzerr/fs.hash
```

### `Example`
``` javascript
const hash = require('fs.hash');

// file, raw, hash type
hash('./node_modules', false, 'sha256').then((res) => {
	console.log(res);
});
```