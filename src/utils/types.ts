type GusProcess = () => void;

type GusExitProcess = (error?: string) => void;

type GusConfigProps = "message" | "file" | "remote" | "trace";
type GusConfigValues = string | string[] | boolean;
interface GusConfig {
  message?: string;
  file?: string[];
  remote?: string;
  trace?: boolean;
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
