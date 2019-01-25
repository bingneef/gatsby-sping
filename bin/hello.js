const chalk = require('chalk')
const pkg = require('../package.json')

console.log(`

${chalk.green('Hey there! 👋')}

${chalk.yellow(
  'yarn run dev'
)} to start a development environment at ${chalk.green('localhost:8000')}

or

${chalk.yellow(
  'yarn run build'
)} to create a production ready static site in ${chalk.green('./public')}
`)
