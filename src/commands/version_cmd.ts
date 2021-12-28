import shell from "shelljs";
import semver from "semver";
import chalk from "chalk";
import execute from "../process/execute_process";

const currentVersion = "1.0.0";

const runVersionFunc: GusProcess = () => {
  const latestVersion = shell.exec("npm view css-class-builder version", {
    silent: true,
  });

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
      return {
        status: "handled",
        message: currentVersionMsg(false) + suggestion,
        trace: currentVersionMsg(false) + suggestion,
      };
    } else {
      return {
        status: "handled",
        message: currentVersionMsg(true),
        trace: currentVersionMsg(true),
      };
    }
  } else {
    return {
      status: "handled",
      message: currentVersionMsg(false),
      trace: currentVersionMsg(false),
    };
  }
};

const currentVersionMsg = (latest: boolean) => {
  if (latest) {
    return `> v${currentVersion} latest`;
  } else {
    return `> v${currentVersion}`;
  }
};

const runVersion = () =>
  execute(runVersionFunc, "Hold on a second, getting information.");

export default runVersion;
