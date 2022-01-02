import shell from 'shelljs';

import { setOutput, config, chain } from '../proxy';
import message from '../utils/message';

export const gitAdd: GusProcess = () => {
  const files = config.run.file.join(' ');

  setOutput({
    status: 'running',
    message: message.add.starting,
  });

  const yetToStageAdd = shell
    .exec('git status', { silent: true })
    .stdout.includes('Changes not staged for commit');

  if (!yetToStageAdd) {
    chain.add = 'done';
    setOutput({
      status: 'done',
      message: message.add.nothingToAdd,
    });
    return;
  }

  const process = shell.exec(`git add ${files}`, { silent: true });

  if (process.code !== 0) {
    chain.add = 'failed';
    setOutput({
      status: 'failed',
      message: message.add.failed,
      log: process.stderr,
    });
  } else {
    chain.add = 'done';
    setOutput({
      status: 'done',
      message: message.add.success,
      log: process.stderr,
    });
  }
};
