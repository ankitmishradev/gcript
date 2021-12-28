#!/usr/bin/env node
import chalk from "chalk";
import { Command, Option } from "commander";
import runVersion from "./commands/version_cmd";

import runProcess from "./process/run_process";
import config from "./utils/config";

config.init();

const program = new Command();

program.name("gus").usage("[global options]");

program.description("A cli tool to automate git versioning process.");

program.option("-v, --version", "Display the current version installed");

program.addHelpText(
  "after",
  `
Visit ${chalk.cyan(
    "https://github.com/ankitmishradev/gus#README"
  )} to see the full documentation.`
);

program.option("-m, --message <message>", "Set commit message");

program.option(
  "-r, --remote <remote>",
  "Send commits to the <remote> repository"
);

program.option(
  "-f, --file <files...>",
  "Specify files to move in the staging area"
);

program.option("-t, --trace", "Trace the complete log of error");

program.helpOption("-h, --help", "Display help for the command");

program.parse(process.argv);

const configuration = program.opts();

if (configuration.version) {
  const output = runVersion();
  if (output === "handled") {
    process.exit(0);
  }
} else {
  config.set(configuration);
  console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);
  runProcess();
}

//// fs.readFile(`${__dirname}/../config.json`, (err, data) => {
//   if (err) {
//     const noFileErr = err.message.includes("no such file or directory");
//     if (noFileErr) {
//       fs.writeFile(`${__dirname}/../config.json`, "{}", (err) => {
//         if (err) console.log(err);
//         else console.log("created file");
//       });
//     } else {
//       console.log(err);
//     }
//   } else {
//     console.log(JSON.parse(data.toString()));
//   }
// });
