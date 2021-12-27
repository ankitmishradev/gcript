const initConfig: GusConfig = {
  file: ["."],
  message: undefined,
  remote: undefined,
  only: undefined,
  trace: false,
};

const init = () => {
  process.env.GUS_CONFIG = JSON.stringify(initConfig);
};

const get = () => {
  return JSON.parse(process.env.GUS_CONFIG!) as GusConfig;
};

const set = (config: GusConfig) => {
  const currentConfig = get();
  const resolvedConfig: GusConfig = {
    file: config.file ?? currentConfig.file,
    message: config.message,
    only: config.only,
    trace: config.trace ?? currentConfig.trace,
    remote: config.remote ?? currentConfig.remote,
  };
  const updatedConfig = JSON.stringify(resolvedConfig);

  process.env.GUS_CONFIG = updatedConfig;
};

const config: GusConfigInterface = {
  init,
  set,
  get,
};

export default config;
