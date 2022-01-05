import fs from 'fs';
import { which } from 'shelljs';

import {
  gitInit,
  gitAdd,
  gitCommit,
  gitPush,
  resolveGitCommitWarn,
  resolveGitPushWarn,
} from '../actions';
import { chain } from '../proxy';
import message from '../utils/message';
import { exitProcess } from './exit_process';

export const runProcess = () => {
  if (!which('git')) {
    console.log(message.common.notFoundGit);
    exitProcess('1');
  } else {
    fs.readdir(`${__dirname}/../../.git`, (err) => {
      if (err) {
        if (err.errno === -4058) {
          gitInit();
          if (chain.init === 'failed') {
            exitProcess('1'); // Exiting process because git init failed.
          }
        }
      }
      processAfterInit();
    });
  }
};

const processAfterInit = () => {
  gitAdd();
  switch (chain.add) {
    case 'done':
      processAfterAdd(); // Process after successful git add.
      break;

    case 'failed':
      exitProcess('1'); // Exiting because git add failed.
      break;
  }
};

export const processAfterAdd = () => {
  gitCommit();
  switch (chain.commit) {
    case 'done':
      processAfterCommit(); // Process after successful git commit.
      break;

    case 'warn':
      resolveGitCommitWarn(); // Resolve git commit warning.
      break;

    case 'failed':
      exitProcess('1'); // Exiting because git commit failed.
      break;
  }
};

export const processAfterCommit = () => {
  gitPush();
  switch (chain.push) {
    case 'done':
      exitProcess(); // Exiting because process ends successfully.
      break;

    case 'warn':
      resolveGitPushWarn(); // Resolve git push warning.
      break;

    case 'failed':
      exitProcess('1'); // Exiting because git push failed.
      break;
  }
};
