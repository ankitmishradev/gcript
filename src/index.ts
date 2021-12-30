#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";

import runVersion from "./commands/version_cmd";
import { runProcess } from "./process";
import { setConfig } from "./proxy";
import { upgradeCmd, runCmd } from "./commands";

const program = new Command();

program.addHelpText(
  "afterAll",
  `
Visit ${chalk.cyan(
    "https://github.com/ankitmishradev/gus#README"
  )} to see the full documentation.`
);

upgradeCmd(program);
runCmd(program);

program.parse(process.argv);
