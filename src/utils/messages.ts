import { config } from "../proxy";

const message = {
  common: {
    emptyString:
      "Your response seems to be an empty string which is not valid.",
  },
  init: {
    failed: "Couldn't initialize a git repository.",
    starting: "Executing git init",
    success: "Initialized a git repository.",
  },
  add: {
    get starting() {
      return `Executing git add ${config.file}`;
    },
    failed: "Couldn't add modified and untracked files to the staging area.",
    success: "Added all modified and untracked files to the staging area.",
  },
  commit: {
    get starting() {
      const m =
        config.message?.length! > 50
          ? config.message?.slice(0, 50).concat("...")
          : config.message;
      return `Executing git commit -m "${m ?? ""}"`;
    },
    success: "Moved files from staging area and created snapshot of changes.",
    failed: "Couldn't move files from staging area to commit.",
    treeClean: "On branch main, there is nothing to commit.",
    noMessage: "No commit message provided.",
    emptyMessage: "Aborting commit due to empty commit message.",
    inEditor: "Waiting for your editor to close the file",
  },
  push: {
    emptyName: "An empty string couldn't be used as remote name.",
    noRemote: "No remote is specified.",
    findNoRemote:
      "> This repository does not have any remotes. Add a remote now:",
    findOriginRemote: "Found origin remote in the repository.",
    detectRemotes: "Searching the repository for remote.",
    haveRemotes: "> You have the following remotes:",
    failDetectRemotes:
      "Couldn't search the repository remotes. Please fix this issue manually.",
    get starting(): string {
      return `Executing git push ${config.remote} ${config.branch}`;
    },

    get noUse() {
      return `Either you do not have access to use '${config.remote}' remote repository or it does not exist.`;
    },
    get failed() {
      return `Couldn't send the local commits to the ${config.remote} repository.`;
    },
    get success() {
      return `Sent the local commits to the ${config.remote} repository.`;
    },
    get remoteAddFail() {
      return `Couldn't add ${config.remote} remote to your local repository.`;
    },
  },
  version: {
    starting: "Hold on a second, getting information",
  },
};

export default message;
