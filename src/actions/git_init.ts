import shell from "shelljs";

import execute from "../process/execute_process";

const gitInitFunc: GusProcess = () => {
  const process = shell.exec("git init", { silent: true });
  if (process.code !== 0) {
    return {
      status: "failed",
      message: "Couldn't initialize a git repository.",
      trace: process.stderr,
    };
  } else {
    return {
      status: "done",
      message: "Initialized a git repository.",
      trace: process.stdout,
    };
  }
};

const gitInit = () => execute(gitInitFunc, "Executing git init");

export default gitInit;
