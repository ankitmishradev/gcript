#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';

import { config } from './proxy';
import { runCmd, upgradeCmd, versionCmd, configCmd } from './cmd';
import useVersion from './utils/use_version';

const program = new Command();

program
  .name('gus')
  .usage('<command> | <command> [options] | [options]')
  .description('A cli tool to ease the process of common git operations.');

program.option(
  '-t, --trace',
  'If available, display the complete log of operation',
);

program.addHelpCommand('help [command]', 'Display help for [command].');

program.helpOption('-h, --help', 'Display help for command');

program.addHelpText(
  'afterAll',
  `
Visit ${chalk.cyan(
    'https://github.com/ankitmishradev/gus#README',
  )} to see the full documentation.`,
);

const gConfig = program.opts<GusGlobalConfig>();

config.global = gConfig;

useVersion();

runCmd(program);
configCmd(program);
versionCmd(program);
upgradeCmd(program);

program.parse(process.argv);
