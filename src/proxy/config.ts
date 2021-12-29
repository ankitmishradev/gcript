const configObject: GusConfig = {};

const configHandler: ProxyHandler<typeof configObject> = {
  set: (target, prop: GusConfigProps, value: GusConfigValues) => {
    switch (prop) {
      case "file":
        target.file = value as string[];
        break;
      case "message":
        target.message = value as string;
        break;
      case "remote":
        target.remote = value as string;
        break;
      case "trace":
        target.trace = value as boolean;
        break;
      default:
        throw new Error("Can not set value of undefined property");
    }

    return true;
  },
  get: (target, prop: GusConfigProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const config = new Proxy(configObject, configHandler);

export const setConfig = (obj: GusConfig) => {
  config.file = obj.file ?? ["."];
  config.message = obj.message;
  config.remote = obj.remote;
  config.trace = obj.trace;
};
