import chalk from "chalk";

const exit: GusExitProcess = ({ error, code = 0 }) => {
  if (error) {
    console.log(chalk.red(`⨉ ${error}`));
  }
  console.log(`\nExiting process with code ${code}.`);
  process.exit(code);
};

export default exit;
