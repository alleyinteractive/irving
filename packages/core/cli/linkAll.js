const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const irvingPackages = fs.readdirSync(
  path.join(process.cwd(), 'node_modules/@irvingjs'),
).map((packageName) => `@irvingjs/${packageName}`);
const link = spawn('npm', ['link'].concat(irvingPackages));

link.stdout.on('data', (data) => {
  console.log(data.toString());
});

link.stderr.on('data', (data) => {
  console.error(data.toString());
});
