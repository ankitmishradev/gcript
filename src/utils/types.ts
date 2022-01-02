type GusProcess = () => void;

type GusExitProcess = (error?: string) => void;

interface GusConfig {
  global: GusGlobalConfig;
  run: GusRunConfig;
  version: GusVersionConfig;
  upgrade: GusUpgradeConfig;
}
type GusConfigProps = "global" | "run" | "version" | "upgrade";
type GusConfigValues =
  | GusGlobalConfig
  | GusRunConfig
  | GusVersionConfig
  | GusUpgradeConfig;
type GusConfigAction =
  | { key: "global"; value: GusGlobalConfig }
  | { key: "run"; value: GusRunConfig }
  | { key: "version"; value: GusVersionConfig }
  | { key: "upgrade"; value: GusUpgradeConfig };

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
interface GusVersionConfig {
  latest: boolean;
}
interface GusUpgradeConfig {
  local: boolean;
  global: boolean;
}

type GusChainProps = "init" | "add" | "commit" | "push" | "version";
type GusChainValues = "done" | "failed" | "warn" | "dead";
interface GusChain {
  init: GusChainValues;
  add: GusChainValues;
  commit: GusChainValues;
  push: GusChainValues;
  version: GusChainValues;
}

type GusOutputStatus = "running" | "failed" | "done" | "warn" | "handled";
type GusOutputProps = "status" | "message" | "log";
interface GusOutput {
  status?: GusOutputStatus;
  message?: string;
  log?: string;
}
