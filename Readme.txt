Install node
rm -rf node_modules/ package-lock.json
npm install ajv@^6.9.1
sudo npm install materialize-css@next
npm install --no-audit
cd functions
rm -rf node_modules/ package-lock.json
npm install --no-audit
cd..
npm run serve
