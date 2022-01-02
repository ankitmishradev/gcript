import shell from 'shelljs';
import readline from 'readline';

import { processAfterAdd, exitProcess, processAfterCommit } from '../process';
import { chain, config, setOutput } from '../proxy';
import message from '../utils/message';

export const gitCommit: GusProcess = () => {
  setOutput({ status: 'running', message: message.commit.starting });

  const treeClean = shell
    .exec('git status', { silent: true })
    .stdout.includes('nothing to commit, working tree clean');

  if (treeClean) {
    chain.commit = 'done';
    setOutput({
      status: 'done',
      message: message.commit.treeClean,
    });
    return;
  }

  const verification = verifyMessage();
  if (verification !== 'done') {
    return;
  }

  const process = shell.exec(`git commit -m "${config.run.message}"`, {
    silent: true,
  });

  if (process.code !== 0) {
    chain.commit = 'failed';
    setOutput({
      status: 'failed',
      message: message.commit.failed,
      log: process.stderr,
    });
  } else {
    chain.commit = 'done';
    setOutput({
      status: 'done',
      message: message.commit.success,
      log: process.stdout,
    });
  }
};

const verifyMessage = () => {
  if (!config.run.message) {
    chain.commit = 'warn';
    setOutput({
      status: 'warn',
      message: message.commit.noMessage,
    });
    return 'warn';
  }

  if (config.run.message?.length === 0) {
    chain.commit = 'failed';
    setOutput({
      status: 'failed',
      message: message.commit.emptyMessage,
    });
    return 'failed';
  }

  if (config.run.message === '.') {
    commitViaEditor();
    return 'handled';
  }

  return 'done';
};

export const resolveGitCommitWarn = () => {
  const commitInvestigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  commitInvestigate.question(
    `? Enter commit message or enter (.) to write in editor: `,
    (commitMessage) => {
      if (commitMessage.length === 0) {
        exitProcess(message.commit.emptyMessage); // Exiting due to empty message.
      } else if (commitMessage === '.') {
        commitViaEditor();
      } else {
        config.run.message = commitMessage;
        commitInvestigate.close();
        processAfterAdd(); // Process after resolving git commit.
      }
    },
  );
};

const commitViaEditor = () => {
  setOutput({
    status: 'running',
    message: message.commit.inEditor,
  });

  const process = shell.exec('git commit', { silent: true });

  if (process.code !== 0) {
    chain.commit = 'failed';
    setOutput({
      status: 'failed',
      message: message.commit.emptyMessage,
      log: process.stderr,
    });
    exitProcess('1');
  } else {
    chain.commit = 'done';
    setOutput({
      status: 'done',
      message: message.commit.success,
      log: process.stdout,
    });
    processAfterCommit();
  }
};
