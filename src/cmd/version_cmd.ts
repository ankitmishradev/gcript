import shell from 'shelljs';
import semver from 'semver';
import chalk from 'chalk';

import { config, setOutput } from '../proxy';
import message from '../utils/message';
import { Command } from 'commander';
import { exitProcess } from '../process';

export const versionCmd = (program: Command) => {
  program
    .command('version')
    .alias('ver')
    .description('Display current version of gcript.')
    .action(runAction);
};

const runAction: GCProcess = async () => {
  console.log(message.common.starting);

  setOutput({ status: 'running', message: message.version.starting });

  const latestVersion = shell.exec('npm view gcript version', {
    silent: true,
    timeout: 5000,
  });

  if (latestVersion.code === 0) {
    const newVersAvail = semver.gt(
      latestVersion.stdout,
      config.global.version!,
    );

    if (newVersAvail) {
      const suggestion = chalk.yellow(
        `\n! A new version ${chalk.cyan(
          'v' + latestVersion.stdout.trim(),
        )} of gcript is available. Please run ${chalk.cyan(
          'gcript upgrade',
        )} command to upgrade gcript.`,
      );
      setOutput({
        status: 'handled',
        message: currentVersionMsg(false) + suggestion,
      });
      exitProcess();
    } else {
      setOutput({
        status: 'handled',
        message: currentVersionMsg(true),
      });
      exitProcess();
    }
    exitProcess();
  } else {
    setOutput({
      status: 'handled',
      message: currentVersionMsg(false),
    });
    exitProcess();
  }
};

const currentVersionMsg = (latest: boolean) => {
  if (latest) {
    return `> v${config.global.version} latest`;
  } else {
    return `> v${config.global.version}`;
  }
};
