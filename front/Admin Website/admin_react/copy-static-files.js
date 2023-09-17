const fs = require('fs-extra');
const path = require('path');

const buildFolder = path.join(__dirname, 'build');
const expressPublicFolder = path.join(__dirname, '../../../back/AdminWeb/build');

fs.copySync(buildFolder, expressPublicFolder, {
  dereference: true,
});

console.log('Static files copied to Express public folder.');