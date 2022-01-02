import shell from "shelljs";
import semver from "semver";
import chalk from "chalk";

import { chain, setOutput } from "../proxy";
import message from "../utils/messages";
import { Command } from "commander";

const currentVersion = "1.0.0";

export const versionCmd = (program: Command) => {
  program
    .command("version")
    .description("Display current version of gus.")
    .action(runAction)
    .option("-l, --latest", "Display latest version of gus available on npm");
};

const runAction: GusProcess = async () => {
  console.log(message.common.starting);

  setOutput({ status: "running", message: message.version.starting });

  const latestVersion = shell.exec("npm view css-class-builder version", {
    silent: true,
    timeout: 5000,
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
        )} command to upgrade gus.`
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
