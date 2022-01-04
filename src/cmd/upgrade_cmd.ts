import shell from 'shelljs';
import { Command } from 'commander';

import { setOutput } from '../proxy';
import { exitProcess } from '../process';
import message from '../utils/message';

export const upgradeCmd = (program: Command) => {
  program
    .command('upgrade')
    .alias('upg')
    .description('Upgrade gus to the latest stable version.')
    .action(upgradeAction);
};

export const upgradeAction = () => {
  console.log(message.common.starting);

  setOutput({
    status: 'running',
    message: message.upgrade.checkingInfo,
  });

  const pkgInfoProcess = shell.exec('npm ls gus --depth=0', { silent: true });

  setOutput({ status: 'done', message: message.upgrade.doneCheckingInfo });

  const globalPkg = pkgInfoProcess.stdout.includes('empty');
  const localPkg = pkgInfoProcess.stdout.includes('gus@');

  if (globalPkg) {
    setOutput({
      status: 'running',
      message: message.upgrade.startUpdate,
    });

    const process = shell.exec('npm update gus -g', { silent: true });

    if (process.code === 0) {
      setOutput({
        status: 'done',
        message: message.upgrade.doneUpdate,
        log: process.stdout,
      });
      exitProcess();
    } else {
      setOutput({
        status: 'failed',
        message: message.upgrade.failUpdate,
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
        message: message.upgrade.doneUpdate,
        log: process.stdout,
      });
      exitProcess();
    } else {
      setOutput({
        status: 'failed',
        message: message.upgrade.failUpdate,
        log: process.stderr,
      });
      exitProcess('1');
    }

    return;
  }
};
