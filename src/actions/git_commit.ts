import shell from "shelljs";
import readline from "readline";

import exit from "../process/exit_process";
import { processAfterAdd } from "../process/run_process";
import { chain, config, setOutput } from "../proxy";
import message from "../utils/messages";

const gitCommit: GusProcess = () => {
  setOutput({ status: "running", message: message.commit.starting });

  const treeClean = shell
    .exec("git status", { silent: true })
    .stdout.includes("nothing to commit, working tree clean");

  if (treeClean) {
    chain.commit = "done";
    setOutput({
      status: "done",
      message: message.commit.treeClean,
    });
    return;
  }

  const verification = verifyMessage();

  if (verification === "failed") {
    return;
  }

  const process = shell.exec(`git commit -m "${config.message}"`, {
    silent: true,
  });
  if (process.code !== 0) {
    chain.commit = "failed";
    setOutput({
      status: "failed",
      message: message.commit.failed,
      log: process.stderr,
    });
  } else {
    chain.commit = "done";
    setOutput({
      status: "done",
      message: message.commit.success,
      log: process.stdout,
    });
  }
};

const verifyMessage = () => {
  if (config.message) {
    chain.commit = "warn";
    setOutput({
      status: "warn",
      message: message.commit.noMessage,
    });
    return "warn";
  }

  if (config.message?.length === 0) {
    chain.commit = "failed";
    setOutput({
      status: "failed",
      message: message.commit.emptyMessage,
    });
    return "failed";
  }
};

export const resolveGitCommitWarn = () => {
  const commitInvestigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  commitInvestigate.question(`? Enter commit message : `, (commitMessage) => {
    if (commitMessage.length === 0) {
      exit(message.commit.emptyMessage); // Exiting due to empty message.
    } else {
      config.message = commitMessage;
      commitInvestigate.close();
      processAfterAdd(); // Process after resolving git commit.
    }
  });
};

export default gitCommit;
