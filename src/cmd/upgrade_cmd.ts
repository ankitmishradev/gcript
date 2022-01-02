import shell from 'shelljs';
import { Command } from 'commander';

import { setOutput } from '../proxy';
import chalk from 'chalk';
import { exitProcess } from '../process';
import message from '../utils/message';

export const upgradeCmd = (program: Command) => {
  program
    .command('upgrade')
    .description('Upgrade gus to the latest stable version.')
    .action(upgradeAction)
    .option('-l, --local', 'Update locally installed gus')
    .option('-g, --global', 'Update globally installed gus');
};

export const upgradeAction = (config: GusUpgradeConfig) => {
  console.log(message.common.starting);

  setOutput({
    status: 'running',
    message: 'Hold on a second, checking information.',
  });

  const pkgInfoProcess = shell.exec('npm ls gus', { silent: true });

  setOutput({ status: 'done', message: 'Finished checking information.' });

  const globalPkg = pkgInfoProcess.stdout.includes('empty');
  const localPkg = pkgInfoProcess.stdout.includes('gus@');

  if (globalPkg) {
    setOutput({
      status: 'running',
      message: 'Updating globally installed gus. This might take a while.',
    });

    const process = shell.exec('npm update gus -g', { silent: true });

    if (process.code === 0) {
      setOutput({
        status: 'done',
        message: 'Updated globally installed gus.',
        log: process.stdout,
      });
      exitProcess();
    } else {
      setOutput({
        status: 'failed',
        message: `Couldn't update globally installed gus.`,
        log: process.stderr,
      });
      exitProcess('1');
    }

    return;
  }

  if (localPkg) {
    setOutput({
      status: 'running',
      message: 'Updating locally installed gus. This might take a while.',
    });

    const process = shell.exec('npm update gus', { silent: true });

    if (process.code === 0) {
      setOutput({
        status: 'done',
        message: 'Updated locally installed gus.',
        log: process.stdout,
      });
      exitProcess();
    } else {
      setOutput({
        status: 'failed',
        message: `Coudn't update locally installed gus.`,
        log: process.stderr,
      });
      exitProcess('1');
    }

    return;
  }

  setOutput({
    status: 'failed',
    message: "Couldn't find information about where gus is installed.",
  });

  console.log(
    `\n> Please manually specify in the command, whether to update locally installed gus or globally by passing ${chalk.cyan(
      '-l',
    )} or ${chalk.cyan('-g')} option.`,
  );

  exitProcess('1');
};
