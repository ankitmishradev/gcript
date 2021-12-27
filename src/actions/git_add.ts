import shell from "shelljs";

import config from "../utils/config";
import execute from "../process/execute_process";

const gitAddFunc: GusProcess = () => {
  const files = config.get().file?.join(" ");
  const process = shell.exec(`git add ${files}`, { silent: true });
  if (process.code !== 0) {
    return {
      status: "failed",
      message: "Couldn't add modified and untracked files to the staging area.",
      trace: process.stderr,
    };
  } else {
    return {
      status: "done",
      message: "Added all modified and untracked files to the staging area.",
      trace: "Added all modified and untracked files to the staging area.",
    };
  }
};

const gitAdd = () => execute(gitAddFunc, "Executing git add .");

export default gitAdd;
