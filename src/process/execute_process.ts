import chalk from "chalk";

import config from "../utils/config";

const execute = (func: GusProcess, message: string) => {
  const trace = config.get().trace;
  const loadingChar = ["\\", "|", "/", "-"]; // Initialize loading characters
  let currentCharIndex = 0; // Initialize current index of loading character.

  process.stdout.write("\x1B[?25l"); // Disabling cli cursor.

  // Initializeing loading animation with help of setInterval.
  const loadingInterval = setInterval(() => {
    process.stdout.write("\r" + loadingChar[currentCharIndex++]);
    currentCharIndex &= 3;
  }, 150);

  // Moving cursor by 2 space to the right from the start of the line to make visible and
  // to put a space between loading animation and starting message.
  process.stdout.moveCursor(2, 0);

  process.stdout.write(message.trim()); // Writing starting message in the cli.

  const output = func(); // Exectuing function and storing output.

  clearInterval(loadingInterval); // Clearing interval to stop loading animation.

  process.stdout.clearLine(0); // Clearing the whole line including loading animation.

  if (trace) {
    process.stdout.write(buildMessage(output.trace, output.status)); // Writing output trace in the cli.
  } else {
    process.stdout.write(buildMessage(output.message, output.status)); // Writing output message in the cli.
  }

  process.stdout.write("\x1b[?25h" + "\n"); // Enabling cli cursor.

  return output.status;
};

const buildMessage = (message: string, status: GusActionStatus) => {
  switch (status) {
    case "done":
      return chalk.green(`\r✓ ${message.trim()}`);
    case "failed":
      return chalk.red(`\r⨉ ${message.trim()}`);
    case "warn":
      return chalk.yellow(`\r! ${message.trim()}`);
  }
};

export default execute;
