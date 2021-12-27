import chalk from "chalk";

const exit: GusExitProcess = ({ error, code = 0 }) => {
  if (error) {
    console.log(chalk.red(`⨉ ${error}`));
  }
  console.log(`\n> Exiting process with code ${code}.`);
  process.exit(code);
};

export default exit;
