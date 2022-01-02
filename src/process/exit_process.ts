import chalk from "chalk";

export const exitProcess: GusExitProcess = (error) => {
  console.log("hey nrp");
  if (error === "1") {
    console.log(`\n> Exiting process with code 1.`);
    process.exit(1);
  } else if (error) {
    console.log(chalk.red(`⨉ ${error}`));
    console.log(`\n> Exiting process with code 1.`);
    process.exit(0);
  } else {
    console.log(`\n> Exiting process with code 0.`);
    process.exit(0);
  }
};
