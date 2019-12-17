#### Cannot read property 'thisCompilation' of undefined 
If you are using webpack@3, use extract-text-webpack-plugin@^3.0.2
If you are using webpack@4, use mini-css-extract-plugin if applicable

"roadhog": "^1.3.1",


#### npm npk
// Step 1: Use `publishConfig` option in your package.json
"publishConfig": { "registry": "https://npm.pkg.github.com/" }
// Step 2: Authenticate
$ npm login --registry=https://npm.pkg.github.com/

// Step 3: Publish
$ npm publish// Step 1: Use `publishConfig` option in your package.json
"publishConfig": { "registry": "https://npm.pkg.github.com/" }
// Step 2: Authenticate
$ npm login --registry=https://npm.pkg.github.com/

// Step 3: Publish
$ npm publish