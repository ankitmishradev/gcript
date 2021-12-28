type GusProcess = () => GusProcessOut;

interface GusProcessOut {
  status: GusActionStatus;
  message: string;
  trace: string;
}

type GusActionStatus = "done" | "failed" | "warn" | "handled";

interface GusMessage {
  start: string;
  done: string;
  failed: string;
}

type GusExitProcess = ({
  error,
  code,
}: {
  error?: string;
  code?: number;
}) => void;

interface GusConfig {
  message?: string;
  file?: string[];
  remote?: string;
  only?: "add" | "commit" | "push";
  trace?: boolean;
}

type GusConfigAction =
  | { key: "message"; value: GusConfig["message"] }
  | { key: "file"; value: GusConfig["file"] }
  | { key: "remote"; value: GusConfig["remote"] }
  | { key: "only"; value: GusConfig["only"] }
  | { key: "trace"; value: GusConfig["trace"] };

interface GusConfigInterface {
  init: () => void;
  set: (action: GusConfig) => void;
  get: () => GusConfig;
}
