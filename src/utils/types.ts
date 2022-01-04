/* eslint-disable @typescript-eslint/no-unused-vars */
type GCProcess = () => void;

type GCExitProcess = (error?: string) => void;

interface GCConfig {
  global: GCGlobalConfig;
  run: GCRunConfig;
}
type GCConfigProps = 'global' | 'run';
type GCConfigValues = GCGlobalConfig | GCRunConfig;
type GCConfigAction =
  | { key: 'global'; value: GCGlobalConfig }
  | { key: 'run'; value: GCRunConfig };

interface GCGlobalConfig {
  trace: boolean;
  version: string;
}
interface GCRunConfig {
  file: string[];
  message: string | undefined;
  remote: string | undefined;
  branch: string | undefined;
}

type GCChainProps = 'init' | 'add' | 'commit' | 'push';
type GCChainValues = 'done' | 'failed' | 'warn' | 'dead';
interface GCChain {
  init: GCChainValues;
  add: GCChainValues;
  commit: GCChainValues;
  push: GCChainValues;
}

type GCOutputStatus = 'running' | 'failed' | 'done' | 'warn' | 'handled';
type GCOutputProps = 'status' | 'message' | 'log';
interface GCOutput {
  status?: GCOutputStatus;
  message?: string;
  log?: string;
}

interface GCPermConfig {
  remote: GCRunConfig['remote'];
  trace: GCGlobalConfig['trace'];
  branch: GCRunConfig['branch'];
}

type GCPermConfigKey = 'remote' | 'trace' | 'branch';

type GCPermConfigOption = {
  set: string | undefined;
  list: string | undefined | boolean;
};
