## Few words on technology used

SkimoFree is built using JavaScript and jQuery.

SkimoFree is written in ES2017 using Modules so for wide browser support the code is packed and transpiled to ES5 using [Webpack](https://webpack.js.org/).

Javascript Runtime dependencies as well as Build and deploy dependecies are managed using [npm](http://npmjs.com/). 

## Steps
```bash
1. Install node
2. rm -rf node_modules/ package-lock.json
3. npm install ajv@^6.9.1
4. sudo npm install materialize-css@next
5. npm install --no-audit
```

## Start a local development server

You can start a local development server by running:

```bash
npm run serve
```

This will make sure your Javascript files are transpiled automatically to ES5.
