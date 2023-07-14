/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const { MONO_REPOS, USES_CASE } = require('./const');

function getTime(){

let today = new Date();
let day = (today.getDate()>9)?today.getDate():'0'+today.getDate();
let month=((today.getMonth()+1)>9)?(today.getMonth()+1):'0'+(today.getMonth()+1)
var date = today.getFullYear()+''+(month)+''+(day);
var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()+'0';
    return  dateTime = date+''+time;
}

let routesTemplates = 'plop-templates/migrations';
let params = [
  {
    path: 'migrations',
    file: getTime()+'-{{dashCase name}}.js',
    template: `${routesTemplates}/migrations.generate.hbs`,
  },
];
module.exports = {
  description: 'Create migration',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name migration: example user or user-permissions ',
    },
    // {
    //   type: "list",
    //   name: "caseuse",
    //   message: "Choice case use create 🛰",
    //   choices: [...USES_CASE],
    // },
  ],
  actions: (data) => {
    let defaultPath = `src/sequelize`;
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
