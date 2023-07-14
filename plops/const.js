/* eslint-disable @typescript-eslint/no-var-requires */
var fs = require('fs');

const USES_CASE = ['create', 'getall', 'getone', 'delete', 'put', 'crud'];

let MONO_REPOS = []; //this is going to contain paths
let folder = __dirname + '/../src/application';
if (fs.existsSync(folder)) {
  let filenames = fs.readdirSync(folder);
  MONO_REPOS = filenames.map(function (filePath) {
    return filePath;
  });
} else {
  MONO_REPOS.push('default');
}

module.exports = { MONO_REPOS, USES_CASE };
