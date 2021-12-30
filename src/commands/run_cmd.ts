import chalk from "chalk";
import { Command } from "commander";
import { runProcess } from "../process";
import { setConfig } from "../proxy";

export const runCmd = (program: Command) => {
  program
    .command("run")
    .description("Run combined git [add, commit, push] operation.")
    .option(
      "-m, --message <message>",
      "Move files from the staging area with commit <message>"
    )
    .option("-f, --file <files...>", "Move <files...> to the staging area")
    .option(
      "-r, --remote <remote>",
      "Push local commits to the <remote> repository"
    )
    .option(
      "-b, --branch <branch>",
      "Use <branch> to push local commits to remote repository"
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
