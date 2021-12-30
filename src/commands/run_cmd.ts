import chalk from "chalk";
import { Command } from "commander";
import { runProcess } from "../process";
import { setConfig } from "../proxy";

export const runCmd = (program: Command) => {
  program
    .command("run")
    .description("Run combined git [add, commit, push] operation.")
    .action(runAction)
    .option(
      "-m, --message <message>",
      "move tracked files to the staging area with commit <message>"
    )
    .option(
      "-f, --file <files...>",
      "specify files to move to the staging area"
    )
    .option(
      "-r, --remote <remote>",
      "push local commits to the <remote> repository"
    )
    .option(
      "-b, --branch <branch>",
      "push commits to the remote repository's <branch> branch"
    )
    .option("-t, --trace", "trace the complete log of error");
};

export const runAction = (options: GusConfig) => {
  setConfig(options);
  console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);
  runProcess();
};
