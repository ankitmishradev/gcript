import fs from "fs";

import exit from "./exit_process";
import gitAdd from "../actions/git_add";
import gitInit from "../actions/git_init";
import { gitCommit, resolveGitCommitWarn } from "../actions/git_commit";
import { gitPush, resolveGitPushWarn } from "../actions/git_push";
import chalk from "chalk";

const runProcess = () => {
  console.log(`\n> Starting process with ${chalk.cyan("gus@1.0.0")}.\n`);
  fs.readdir(`${__dirname}/../../.git`, (err, _) => {
    if (err) {
      if (err.errno === -4058) {
        const gitInitOutput = gitInit();
        if (gitInitOutput === "failed") {
          exit({ code: 1 }); // Exiting process because git init failed.
        }
      }
    }
    processAfterInit();
  });
};

const processAfterInit = () => {
  const output = gitAdd();
  switch (output) {
    case "done":
      processAfterAdd(); // Process after successful git add.
      break;

    case "failed":
      exit({ code: 1 }); // Exiting because git add failed.
      break;
  }
};

export const processAfterAdd = () => {
  const output = gitCommit();
  switch (output) {
    case "done":
      processAfterCommit(); // Process after successful git commit.
      break;

    case "warn":
      resolveGitCommitWarn(); // Resolve git commit warning.
      break;

    case "failed":
      exit({ code: 1 }); // Exiting because git commit failed.
      break;
  }
};

export const processAfterCommit = () => {
  const output = gitPush();
  switch (output) {
    case "done":
      exit({ code: 0 }); // Exiting because process ends successfully.
      break;

    case "warn":
      resolveGitPushWarn(); // Resolve git push warning.
      break;

    case "failed":
      exit({ code: 1 }); // Exiting because git push failed.
      break;
  }
};

export default runProcess;
