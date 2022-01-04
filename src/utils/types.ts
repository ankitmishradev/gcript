/* eslint-disable @typescript-eslint/no-unused-vars */
type GusProcess = () => void;

type GusExitProcess = (error?: string) => void;

interface GusConfig {
  global: GusGlobalConfig;
  run: GusRunConfig;
}
type GusConfigProps = 'global' | 'run';
type GusConfigValues = GusGlobalConfig | GusRunConfig;
type GusConfigAction =
  | { key: 'global'; value: GusGlobalConfig }
  | { key: 'run'; value: GusRunConfig };

interface GusGlobalConfig {
  trace: boolean;
  version: string;
}
interface GusRunConfig {
  file: string[];
  message: string | undefined;
  remote: string | undefined;
  branch: string | undefined;
}

type GusChainProps = 'init' | 'add' | 'commit' | 'push';
type GusChainValues = 'done' | 'failed' | 'warn' | 'dead';
interface GusChain {
  init: GusChainValues;
  add: GusChainValues;
  commit: GusChainValues;
  push: GusChainValues;
}

type GusOutputStatus = 'running' | 'failed' | 'done' | 'warn' | 'handled';
type GusOutputProps = 'status' | 'message' | 'log';
interface GusOutput {
  status?: GusOutputStatus;
  message?: string;
  log?: string;
}

interface GusPermConfig {
  remote: GusRunConfig['remote'];
  trace: GusGlobalConfig['trace'];
  branch: GusRunConfig['branch'];
}

type GusPermConfigKey = 'remote' | 'trace' | 'branch';

type GusPermConfigOption = {
  set: string | undefined;
  list: string | undefined | boolean;
};
