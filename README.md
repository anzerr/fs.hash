
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

hash('./node_modules', {raw: true, max: 5, type: 'sha256'}).then((res) => {
	console.log(res);
});
```