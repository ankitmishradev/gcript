#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";

import { runProcess } from "./process";
import { setConfig } from "./proxy";
import { runCmd, upgradeCmd, versionCmd } from "./commands";

const program = new Command();

program.name("gus").usage("<command> | <command> [options] | [options]");

program.addHelpCommand("help [command]", "Display help for [command]");

program.helpOption("-h, --help", "Displat help for command");

program.addHelpText(
  "afterAll",
  `
Visit ${chalk.cyan(
    "https://github.com/ankitmishradev/gus#README"
  )} to see the full documentation.`
);

runCmd(program);
versionCmd(program);
upgradeCmd(program);

program.parse(process.argv);
