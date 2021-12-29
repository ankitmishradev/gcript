import readline from "readline";
import shell from "shelljs";

import message from "../utils/messages";
import { chain, config, setOutput } from "../proxy";
import exit from "../process/exit_process";
import { processAfterCommit } from "../process/run_process";

const gitPush: GusProcess = async () => {
  setOutput({ status: "running", message: message.push.starting });

  const verification = verifyRemote();
  if (verification !== "done") {
    return;
  }

  const process = shell.exec(`git push ${config.remote} main`, {
    silent: true,
  });
  if (process.code !== 0) {
    chain.push = "failed";
    setOutput({
      status: "failed",
      message: message.push.failed,
      log: process.stderr,
    });
  } else {
    chain.push = "done";
    setOutput({
      status: "done",
      message: message.push.success,
      log: process.stdout,
    });
  }
};

const verifyRemote = () => {
  if (!config.remote) {
    chain.push = "warn";
    setOutput({
      status: "warn",
      message: message.push.noRemote,
    });
    return "warn";
  }

  if (config.remote?.length === 0) {
    chain.push = "failed";
    setOutput({
      status: "failed",
      message: message.push.emptyName,
    });
    return "failed";
  }

  return "done";
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
        exit(message.push.emptyName); // Exiting due to empty remote url.
      } else {
        investigate.question("? Enter remote name : ", (remoteName) => {
          if (remoteName.length === 0) {
            exit(message.push.emptyName); // Exiting due to empty remote name.
          } else {
            const process = shell.exec(
              `git remote add ${remoteName} ${remoteUrl}`
            );
            if (process.code === 0) {
              config.remote = remoteName;
              investigate.close();
              processAfterCommit(); // Process after resolving git push warning.
            } else {
              exit(config.trace ? process.stderr : message.push.remoteAddFail); // Exiting because couldn't add new remote.
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
        exit(message.push.noUse); // Exiting because empty remote entered.
      } else {
        config.remote = remote;
        investigate.close();
        processAfterCommit(); // Process after resolving git push warning.
      }
    }
  );
};

export default gitPush;
