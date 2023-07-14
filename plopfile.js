/* eslint-disable @typescript-eslint/no-var-requires */
const { generateMigration, generateCaseUse } = require('./plops');
module.exports = function (plop) {
  plop.setGenerator('Generate Migration', generateMigration);
  plop.setGenerator('Generate Case Use', generateCaseUse);
};
