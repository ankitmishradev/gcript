import { Command } from 'commander';
import { readConfig, setConfig } from '../actions';

export const configCmd = (program: Command) => {
  program
    .command('config')
    .description('Set and view global configurations of gcript.')
    .option(
      '-s, --set <key=value>',
      'Assign <value> to <key> in global configuration',
    )
    .option(
      '-l, --list [key]',
      'Display list of global configuration or configuration specific to [key]',
    )
    .action(configAction);
};

const configAction = (option: GCPermConfigOption, program: Command) => {
  if (option.set) {
    setConfig(option.set);
    return;
  }
  if (option.list) {
    readConfig(option.list);
    return;
  }
  program.help();
};
