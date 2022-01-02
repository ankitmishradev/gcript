import chalk from "chalk";

import { config, output } from "../proxy";

export const printProcess = () => {
  if (output.status === "running") {
    startingLine();
  } else {
    process.stdout.clearLine(0); // Clearing the whole line including loading animation.

    process.stdout.write(endingLine()); // Writing output trace in the cli.

    process.stdout.write("\x1b[?25h" + "\n");
  }
};

const startingLine = () => {
  process.stdout.write("\x1B[?25l"); // Disabling cli cursor.

  process.stdout.write(`\r> ${output.message!}`); // Writing starting message in the cli.
};

const endingLine = () => {
  const message = config.global.trace ? output.log : output.message;

  switch (output.status) {
    case "done":
      return chalk.green(`\r✓ ${message}`);
    case "failed":
      return chalk.red(`\r⨉ ${message}`);
    case "warn":
      return chalk.yellow(`\r! ${message}`);
    default:
      return `\r${message}`;
  }
};
