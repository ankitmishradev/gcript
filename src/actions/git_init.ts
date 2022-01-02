import shell from "shelljs";

import { setOutput, chain } from "../proxy";
import message from "../utils/message";

export const gitInit: GusProcess = () => {
  setOutput({
    message: message.init.starting,
    status: "running",
  });

  const process = shell.exec("git init", { silent: true });
  if (process.code !== 0) {
    chain.init = "failed";
    setOutput({
      status: "failed",
      message: message.init.failed,
      log: process.stderr,
    });
  } else {
    chain.init = "done";
    setOutput({
      status: "done",
      message: message.init.success,
      log: process.stdout,
    });
  }
};
