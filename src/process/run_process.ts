import fs from "fs";

import exit from "./exit_process";
import gitAdd from "../actions/git_add";
import gitInit from "../actions/git_init";
import gitCommit, { resolveGitCommitWarn } from "../actions/git_commit";
import gitPush, { resolveGitPushWarn } from "../actions/git_push";
import { chain } from "../proxy";

const runProcess = () => {
  fs.readdir(`${__dirname}/../../.git`, (err, _) => {
    if (err) {
      if (err.errno === -4058) {
        gitInit();
        if (chain.init === "failed") {
          exit("1"); // Exiting process because git init failed.
        }
      }
    }
    processAfterInit();
  });
};

const processAfterInit = () => {
  gitAdd();
  switch (chain.add) {
    case "done":
      processAfterAdd(); // Process after successful git add.
      break;

    case "failed":
      exit("1"); // Exiting because git add failed.
      break;
  }
};

export const processAfterAdd = () => {
  gitCommit();
  switch (chain.commit) {
    case "done":
      processAfterCommit(); // Process after successful git commit.
      break;

    case "warn":
      resolveGitCommitWarn(); // Resolve git commit warning.
      break;

    case "failed":
      exit("1"); // Exiting because git commit failed.
      break;
  }
};

export const processAfterCommit = () => {
  gitPush();
  switch (chain.push) {
    case "done":
      exit(); // Exiting because process ends successfully.
      break;

    case "warn":
      resolveGitPushWarn(); // Resolve git push warning.
      break;

    case "failed":
      exit("1"); // Exiting because git push failed.
      break;
  }
};

export default runProcess;
