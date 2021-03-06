import chalk from 'chalk';
import { config } from '../proxy';

const buildAddMessage = (head: string) => {
  return `${head} git add ${config.run.file.join(' ')}`;
};

const buildCommitMessage = (head: string) => {
  let m: string;
  if (config.run.message) {
    m =
      config.run.message.length > 50
        ? config.run.message?.slice(0, 50).concat('...')
        : config.run.message;
  } else {
    m = '';
  }

  return `${head} git commit -m "${m}"`;
};

const buildPushMessage = (head: string) => {
  return `${head} git push ${config.run.remote} ${config.run.branch}`;
};

const message = {
  common: {
    emptyString:
      'Your response seems to be an empty string which is not valid.',

    get starting(): string {
      return `> Starting process with ${chalk.cyan(
        `gcript@${config.global.version}`,
      )}\n`;
    },
    notFoundGit: `> Git is not installed on your machine. Please install git to work with gcript. Visit \n${chalk.cyan(
      'https://git-scm.com/downloads',
    )} to get information regarding git installation.`,
  },
  init: {
    failed: 'Failed executing git init.',
    starting: 'Executing git init',
    success: 'Successfully executed git init.',
  },
  add: {
    nothingToAdd: 'On branch main, all changes are already staged.',
    get starting(): string {
      return buildAddMessage('Executing');
    },
    get failed(): string {
      return buildAddMessage('Failed executing');
    },
    get success(): string {
      return buildAddMessage('Successfully executed');
    },
  },
  commit: {
    get starting() {
      return buildCommitMessage('Executing');
    },
    get success() {
      return buildCommitMessage('Successfully executed');
    },
    get failed() {
      return buildCommitMessage('Failed executing');
    },
    treeClean: 'On branch main, there is nothing to commit.',
    noMessage: 'No commit message provided.',
    emptyMessage: 'Aborting commit due to empty commit message.',
    inEditor: 'Waiting for your editor to close the file',
    inEditorSuccess: 'Successfully executed git commit',
    inEditorFailed: 'Failed executing executed git commit',
  },
  push: {
    emptyName: "An empty string couldn't be used as remote name.",
    noRemote: 'No remote is specified.',
    findNoRemote:
      '> This repository does not have any remotes. Add a remote now:',
    findOriginRemote: 'Found origin remote in the repository.',
    detectRemotes: 'Searching the repository for remote.',
    haveRemotes: '> You have the following remotes:',
    failDetectRemotes:
      "Couldn't search the repository remotes. Please fix this issue manually.",
    get starting() {
      return buildPushMessage('Executing');
    },
    get failed() {
      return buildPushMessage('Failed executing');
    },
    get success() {
      return buildPushMessage('Successfully executed');
    },
    get noUse() {
      return `Either you do not have access to use '${config.run.remote}' remote repository or it does not exist.`;
    },
    get remoteAddFail() {
      return `Couldn't add ${config.run.remote} remote to your local repository.`;
    },
  },
  version: {
    starting: 'Hold on a second, getting information',
  },
  upgrade: {
    checkingInfo: 'Hold on a second, checking information',
    doneCheckingInfo: 'Successfully retrieved information.',
    startUpdate: 'Updating gcript. This might take a while',
    doneUpdate: `Successfully updated gcript. Run ${chalk.cyan(
      'gcript version',
    )} to check current verion.`,
    failUpdate: 'Failed updating gcript. Please try again.',
  },
  config: {
    readStarting: 'Hold on a second, getting configurations',
    noConfigFile: '> You do not have any global configuration of gcript.',
    setStarting: 'Changing global configuration of gcript',
    setSuccess: `Changed global configuration of gcript.`,
    setFailed: `Failed changing global configuration of gcript.`,
    setFailedInvalid:
      'Either you have used wrong to pattern to change configuration or the property you are trying to change does not exist in gcript configuration.',
  },
};

export default message;
