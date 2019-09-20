
### `Intro`
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