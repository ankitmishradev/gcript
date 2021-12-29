#!/usr/bin/env node
import chalk from "chalk";
import { Command, Option } from "commander";

import runVersion from "./commands/version_cmd";

import runProcess from "./process/run_process";
import { setConfig } from "./proxy/config";

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
  runVersion();
} else {
  setConfig(configuration);
  console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);
  runProcess();
}
