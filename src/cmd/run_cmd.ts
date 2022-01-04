import { Command } from 'commander';
import { runProcess } from '../process';
import { config } from '../proxy';
import message from '../utils/message';

export const runCmd = (program: Command) => {
  program
    .command('run')
    .description('Run combined git [add, commit, push] operation.')
    .option(
      '-m, --message <message>',
      'Move files from the staging area to commit with <message>',
    )
    .option(
      '-f, --file <files...>',
      'Add changes from the <files...> to the staging area',
    )
    .option(
      '-r, --remote <remote>',
      'Push local commits to the <remote> repository',
    )
    .option(
      '-b, --branch <branch>',
      "Push local commits to the remote repository's <branch>",
    )

    .action(runAction);
};

const runAction = (options: GCRunConfig) => {
  config.run = options;
  console.log(message.common.starting);
  runProcess();
};
