import chalk from "chalk";
import { config } from "../proxy";
//k
const buildAddMessage = (head: string) => {
  return `${head} git add ${config.run.file}`;
};

const buildCommitMessage = (head: string) => {
  const m =
    config.run.message?.length! > 50
      ? config.run.message?.slice(0, 50).concat("...")
      : config.run.message;

  return `${head} git commit -m "${m ?? ""}"`;
};

const buildPushMessage = (head: string) => {
  return `${head} git push ${config.run.remote} ${config.run.branch}`;
};

const message = {
  common: {
    emptyString:
      "Your response seems to be an empty string which is not valid.",
    starting: `\n> Starting process with ${chalk.cyan(
      `gus@${config.global.version}`
    )}`,
  },
  init: {
    failed: "Failed executing git init.",
    starting: "Executing git init",
    success: "Successfully executed git init.",
  },
  add: {
    nothingToAdd: "On branch main, all files and changes are already staged.",
    starting: buildAddMessage("Executing"),
    failed: buildAddMessage("Faile executing"),
    success: buildAddMessage("Successfully executed"),
  },
  commit: {
    starting: buildCommitMessage("Executing"),
    success: buildCommitMessage("Successfully executed"),
    failed: buildCommitMessage("Failed executing"),
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
    starting: buildPushMessage("Executing"),
    failed: buildPushMessage("Failed executing"),
    success: buildPushMessage("Successfully executed"),
    get noUse() {
      return `Either you do not have access to use '${config.run.remote}' remote repository or it does not exist.`;
    },
    get remoteAddFail() {
      return `Couldn't add ${config.run.remote} remote to your local repository.`;
    },
  },
  version: {
    starting: "Hold on a second, getting information",
  },
};

export default message;
