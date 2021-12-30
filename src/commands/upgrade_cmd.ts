import { Command } from "commander";

export const upgradeCmd = (program: Command) => {
  program
    .command("upgrade")
    .description("Upgrade gus to the latest stable version.")
    .action(upgradeAction);
};

export const upgradeAction = () => {};
