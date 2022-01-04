import useConfigFile from '../utils/use_config_file';

const configObject: GusConfig = {
  global: {
    trace: (useConfigFile('trace') as boolean) ?? false,
    version: '1.0.0',
  },
  run: {
    file: ['.'],
    branch: (useConfigFile('branch') as string) ?? 'main',
    message: undefined,
    remote: useConfigFile('remote') as string,
  },
  version: {
    latest: false,
  },
  upgrade: {
    local: true,
    global: false,
  },
};

const configHandler: ProxyHandler<typeof configObject> = {
  set: (target, prop: GusConfigProps, value: GusConfigValues) => {
    if (prop === 'run') {
      target.run = resolveRunConfig(value as GusRunConfig);
      return true;
    }

    if (prop === 'global') {
      target.global = resolveGlobalConfig(value as GusGlobalConfig);
    }

    Reflect.set(target, prop, value);

    return true;
  },
  get: (target, prop: GusConfigProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const config = new Proxy(configObject, configHandler);

const resolveRunConfig = (value: GusRunConfig) => {
  if (!value.branch || value.branch.length === 0) {
    value.branch = config.run.branch;
  }
  if (!value.file) {
    value.file = config.run.file;
  }
  if (!value.remote) {
    value.remote = config.run.remote;
  }

  return value;
};

const resolveGlobalConfig = (value: GusGlobalConfig) => {
  if (!value.version) {
    value.version = config.global.version;
  }

  if (value.trace === undefined) {
    value.trace = false;
  }

  return value;
};
