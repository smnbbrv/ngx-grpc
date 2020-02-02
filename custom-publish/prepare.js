const fs = require('fs');
const path = require('path');

const [, , fileName, version] = process.argv;

if (!fileName) {
  console.error('File name is not provided');
  process.exit(1);
}

if (!version) {
  console.error('Version is not provided');
  process.exit(1);
}

const fullPath = path.resolve(fileName);
const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

json.version = version;

console.log(`Patched ${fullPath} with new version ${version}`);

if (json.peerDependencies) {
  Object.keys(json.peerDependencies).filter(key => key.startsWith('@ngx-grpc/')).forEach(key => {
    json.peerDependencies[key] = version;

    console.log(`Patched ${fullPath} peer dependency ${key} with the version ${version}`);
  })
}

fs.writeFileSync(fullPath, JSON.stringify(json, null, 2));

console.log(`Saved ${fullPath}`);
