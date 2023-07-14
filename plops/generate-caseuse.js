/* eslint-disable @typescript-eslint/no-var-requires */
const { MONO_REPOS, USES_CASE } = require('./const');

let routesTemplates = 'plop-templates/modules/';
let params = [
  {
    path: 'use-cases',
    file: '{{dashCase name}}.usecase.service.ts',
    template: `${routesTemplates}/caseuse/nest.caseuse.hbs`,
  },
  {
    path: 'use-cases',
    file: 'caseuse.constants.ts',
    template: `${routesTemplates}/caseuse/nest.const.caseuse.hbs`,
  },
];
module.exports = {
  description: 'Create case-use',
  prompts: [
    {
      type: 'input',
      name: 'model',
      message: 'Name Model: example user or user-permissions ',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name Case: example: create-user',
    },
    {
      type: 'list',
      name: 'monorepo',
      message: 'Choice Name monorepo 🛰',
      choices: [...MONO_REPOS],
    },
  ],
  actions: (data) => {
    let defaultPath = `src/application/${data.monorepo}/`;
    let arrayCOnfig = [];
    arrayCOnfig = params.map((e) => {
      return {
        type: 'add',
        path: `${defaultPath}/${e.path}/${e.file}`,
        templateFile: e?.template,
        abortOnFail: true,
        skipIfExists: true,
        data: { ...e?.data },
      };
    });
    console.log(arrayCOnfig);
    return arrayCOnfig;
  },
};
