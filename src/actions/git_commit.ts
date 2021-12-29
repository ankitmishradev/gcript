import shell from "shelljs";
import readline from "readline";

import { processAfterAdd, exitProcess } from "../process";
import { chain, config, setOutput } from "../proxy";
import message from "../utils/messages";

export const gitCommit: GusProcess = () => {
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
  if (verification !== "done") {
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
  if (!config.message) {
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

  return "done";
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
      } else if (commitMessage === ".") {
        setOutput({
          status: "running",
          message: "Waiting for your editor to close the file",
        });
        const p = shell.exec("git commit", { silent: true });
        if (p.code === 0) {
          console.log(p.stdout);
        } else {
          console.log(p.stderr);
        }
      } else {
        config.message = commitMessage;
        commitInvestigate.close();
        processAfterAdd(); // Process after resolving git commit.
      }
    }
  );
};
