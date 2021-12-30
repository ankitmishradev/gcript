import chalk from "chalk";
import { Command } from "commander";
import { runProcess } from "../process";
import { config, setConfig } from "../proxy";

export const runCmd = (program: Command) => {
  program
    .command("run")
    .description("Run combined git [add, commit, push] operation.")
    .option(
      "-m, --message <message>",
      "Move files from the staging area to commit with <message>"
    )
    .option(
      "-f, --file <files...>",
      "Add changes from the <files...> to the staging area"
    )
    .option(
      "-r, --remote <remote>",
      "Push local commits to the <remote> repository"
    )
    .option(
      "-b, --branch <branch>",
      "Push local commits to the remote repository's <branch>"
    )
    .option(
      "-t, --trace",
      "If available, display the complete log of operation"
    )
    .action(runAction);
};

export const runAction = (options: GusConfig) => {
  setConfig(options);
  console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);
  runProcess();
};
