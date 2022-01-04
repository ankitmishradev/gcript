import useConfigFile from '../utils/use_config_file';

const configObject: GCConfig = {
  global: {
    trace: (useConfigFile('trace') as boolean) ?? false,
    version: '',
  },
  run: {
    file: ['.'],
    branch: (useConfigFile('branch') as string) ?? 'main',
    message: undefined,
    remote: useConfigFile('remote') as string,
  },
};

const configHandler: ProxyHandler<typeof configObject> = {
  set: (target, prop: GCConfigProps, value: GCConfigValues) => {
    if (prop === 'run') {
      target.run = resolveRunConfig(value as GCRunConfig);
      return true;
    }

    if (prop === 'global') {
      target.global = resolveGlobalConfig(value as GCGlobalConfig);
    }

    Reflect.set(target, prop, value);

    return true;
  },
  get: (target, prop: GCConfigProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const config = new Proxy(configObject, configHandler);

const resolveRunConfig = (value: GCRunConfig) => {
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

const resolveGlobalConfig = (value: GCGlobalConfig) => {
  if (!value.version) {
    value.version = config.global.version;
  }

  if (value.trace === undefined) {
    value.trace = config.global.trace;
  }

  return value;
};
