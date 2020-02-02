const fs = require('fs');
const path = require('path');
const { NPM_TOKEN } = process.env;

if (!NPM_TOKEN) {
    console.error('No NPM_TOKEN provided')
    process.exit(1);
}

fs.writeFileSync(path.resolve('.npmrc'), `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`);