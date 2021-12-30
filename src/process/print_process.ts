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
  const message = config.trace ? output.log : output.message;

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

// const loadingChar = ["\\", "|", "/", "-"]; // Initialize loading characters
// let currentCharIndex = 0; // Initialize current index of loading character.
// // Loader function.
// const loader = () => {
//   process.stdout.write("\r" + loadingChar[currentCharIndex++]);
//   currentCharIndex &= 3;
// };

// setInterval(loader, 100).ref();

// // Moving cursor by 2 space to the right from the start of the line to make visible and
// // to put a space between loading animation and starting message.
// process.stdout.moveCursor(1, 0);
