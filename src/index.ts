#!/usr/bin/env node
import chalk from "chalk";
import { Command, Option } from "commander";

import runProcess from "./process/run_process";
import config from "./utils/config";

config.init();

const program = new Command();

program.name("gus").usage("[global options]");

program.description("A cli tool to automate git versioning process.");

program.version(
  "1.0.0",
  "-v, --version",
  "Display the current version installed"
);

program.addHelpText(
  "after",
  `
Visit ${chalk.cyan(
    "https://github.com/ankitmishradev/gus#README"
  )} to see the full documentation for ${chalk.cyan("gus")}.
`
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

const onlyOption = new Option(
  "-o, --only <action>",
  "Execute only git <action>"
);

program.addOption(onlyOption.choices(["add", "commit", "push"]));

program.helpOption("-h, --help", "Display help for the command");

program.parse(process.argv);

const configuration = program.opts();

config.set(configuration);

console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);

runProcess();

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
