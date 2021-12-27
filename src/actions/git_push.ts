import readline from "readline";
import shell from "shelljs";

import config from "../utils/config";
import { commonMessage, pushMessage } from "../utils/messages";

import execute from "../process/execute_process";
import exit from "../process/exit_process";
import { processAfterCommit } from "../process/run_process";

const gitPushFunc: GusProcess = () => {
  const inputRemote = config.get().remote;
  const remoteValidation = checkRemote();
  if (remoteValidation) return remoteValidation;

  const process = shell.exec(`git push ${inputRemote} main`, { silent: true });
  if (process.code !== 0) {
    return {
      status: "failed",
      message: pushMessage(inputRemote).error,
      trace:
        process.stderr.length === 0
          ? pushMessage(inputRemote).error
          : process.stderr,
    };
  } else {
    return {
      status: "done",
      message: pushMessage(inputRemote).success,
      trace:
        process.stdout.length === 0
          ? pushMessage(inputRemote).success
          : process.stdout,
    };
  }
};

const checkRemote = (): GusProcessOut | null => {
  const inputRemote = config.get().remote;

  if (!inputRemote) {
    // Implement default configuration.
    return {
      status: "warn",
      message: pushMessage().noRemoteGiven,
      trace: pushMessage().noRemoteGiven,
    };
  }

  if (inputRemote && inputRemote.length === 0) {
    return {
      status: "failed",
      message: pushMessage().invalid,
      trace: pushMessage().invalid,
    };
  }

  return null;
};

export const resolveGitPushWarn = () => {
  const process = shell.exec("git remote", { silent: true });
  const remoteListStr = process.stdout.trim();

  if (remoteListStr.length === 0) {
    addGitRemote();
  } else {
    const remoteList = remoteListStr.split("\n");
    chooseGitRemote(remoteList);
  }
};

const addGitRemote = () => {
  const investigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  investigate.question(
    "> You do not have any remote configured with this repository. Add a remote now:\n? Enter remote url : ",
    (remoteUrl) => {
      if (remoteUrl.length === 0) {
        exit({
          error: commonMessage.emptyString,
          code: 1,
        }); // Exiting due to empty remote url.
      } else {
        investigate.question("? Enter remote name : ", (remoteName) => {
          if (remoteName.length === 0) {
            exit({
              error: commonMessage.emptyString,
              code: 1,
            }); // Exiting due to empty remote name.
          } else {
            const process = shell.exec(
              `git remote add ${remoteName} ${remoteUrl}`
            );
            if (process.code === 0) {
              config.set({ ...config.get(), remote: remoteName });
              investigate.close();
              processAfterCommit(); // Process after resolving git push warning.
            } else {
              const trace = config.get().trace;
              exit({
                error: trace
                  ? process.stderr
                  : pushMessage(remoteName).remoteAddFail,
                code: process.code,
              }); // Exiting because couldn't add new remote.
            }
          }
        });
      }
    }
  );
};

const chooseGitRemote = (remoteList: string[]) => {
  console.log("> You have the following remotes:");

  let remoteListStr: string = "> ";

  for (let i = 0; i < remoteList.length; i++) {
    remoteListStr = remoteListStr + `${i + 1}. ${remoteList[i]}  `;
  }

  console.log(remoteListStr);

  const investigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  investigate.question(
    "? Enter remote name from the above list or another remote url : ",
    (remote) => {
      if (remote.length === 0) {
        exit({ error: pushMessage("").invalid, code: 1 }); // Exiting because empty remote entered.
      } else {
        config.set({ ...config.get(), remote: remote });
        investigate.close();
        processAfterCommit(); // Process after resolving git push warning.
      }
    }
  );
};

export const gitPush = () => execute(gitPushFunc, "Executing git push ...");
