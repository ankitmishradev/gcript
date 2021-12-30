import { Command } from "commander";

export const upgradeCmd = (program: Command) => {
  program
    .command("upgrade")
    .description("Upgrade gus to the latest stable version.")
    .action(upgradeAction)
    .option("-j, --jun", "test help");
};

export const upgradeAction = () => {};
