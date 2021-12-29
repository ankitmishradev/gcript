import shell from "shelljs";
import semver from "semver";
import chalk from "chalk";

import execute from "../process/execute_process";
import { chain, setOutput } from "../proxy";
import message from "../utils/messages";

const currentVersion = "1.0.0";

const runVersion: GusProcess = async () => {
  setOutput({ status: "running", message: message.version.starting });

  const latestVersion = shell.exec("npm view css-class-builder version", {
    silent: true,
  });

  chain.version = "done";

  if (latestVersion.code === 0) {
    const newVersAvail = semver.gt(latestVersion.stdout, currentVersion!);

    if (newVersAvail) {
      const suggestion = chalk.yellow(
        `\n! A new version ${chalk.cyan(
          "v" + latestVersion.stdout.trim()
        )} of gus is available. Please run ${chalk.cyan(
          "gus upgrade"
        )} command to upgrade.`
      );
      setOutput({
        status: "handled",
        message: currentVersionMsg(false) + suggestion,
      });
    } else {
      setOutput({
        status: "handled",
        message: currentVersionMsg(true),
      });
    }
  } else {
    setOutput({
      status: "handled",
      message: currentVersionMsg(false),
    });
  }
};

const currentVersionMsg = (latest: boolean) => {
  if (latest) {
    return `> v${currentVersion} latest`;
  } else {
    return `> v${currentVersion}`;
  }
};

export default runVersion;
