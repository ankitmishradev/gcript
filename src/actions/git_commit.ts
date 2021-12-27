import shell from "shelljs";
import readline from "readline";

import config from "../utils/config";
import { commitMessage } from "../utils/messages";

import exit from "../process/exit_process";
import execute from "../process/execute_process";
import { processAfterAdd } from "../process/run_process";

const gitCommitFunc: GusProcess = () => {
  const treeClean = shell
    .exec("git status", { silent: true })
    .stdout.includes("nothing to commit, working tree clean");

  if (treeClean) {
    return {
      status: "done",
      message: commitMessage.treeClean,
      trace: commitMessage.treeCleanTrace,
    };
  }

  const message = config.get().message;
  if (!message) {
    return {
      status: "warn",
      message: commitMessage.noMessage,
      trace: commitMessage.noMessage,
    };
  }

  if (message.length === 0) {
    return {
      status: "failed",
      message: commitMessage.emptyMessage,
      trace: commitMessage.emptyMessage,
    };
  }

  const process = shell.exec(`git commit -m "${message}"`, { silent: true });
  if (process.code !== 0) {
    return {
      status: "failed",
      message: commitMessage.error,
      trace: process.stderr.length === 0 ? commitMessage.error : process.stderr,
    };
  } else {
    return {
      status: "done",
      message: commitMessage.success,
      trace:
        process.stdout.length === 0 ? commitMessage.success : process.stdout,
    };
  }
};

export const resolveGitCommitWarn = () => {
  const commitInvestigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  commitInvestigate.question(`? Enter commit message : `, (message) => {
    if (message.length === 0) {
      exit({ error: commitMessage.emptyMessage }); // Exiting due to empty message.
    } else {
      const currentConfig = config.get();
      config.set({ ...currentConfig, message: message });
      commitInvestigate.close();
      processAfterAdd(); // Process after resolving git commit.
    }
  });
};

export const gitCommit = () =>
  execute(gitCommitFunc, "Executing git commit -m ...");
