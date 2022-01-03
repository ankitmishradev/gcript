import fs from 'fs';
import path from 'path';

import { exitProcess } from '../process';
import { setOutput } from '../proxy';
import message from '../utils/message';

const filePath = path.join(__dirname, '../../config.json');
const initPermConfig: GusPermConfig = {
  branch: 'main',
  remote: undefined,
  trace: false,
};

export const setConfig = (value: string) => {
  console.log(message.common.starting);

  setOutput({
    status: 'running',
    message: message.config.setStarting,
  });

  const pair = resolveConfigPair(value);

  if (!pair) {
    setOutput({ status: 'failed', message: message.config.setFailedInvalid });
    exitProcess('1');
    return;
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    const newConfig = resolvePermConfig(data, pair);
    fs.writeFile(filePath, JSON.stringify(newConfig), 'utf-8', (err) => {
      if (err) {
        setOutput({ status: 'failed', message: message.config.setFailed });
        exitProcess('1');
      } else {
        setOutput({ status: 'done', message: message.config.setSuccess });
        exitProcess();
      }
    });
  });
};

const resolvePermConfig = (
  data: string,
  pair: {
    [x: string]: string;
  },
) => {
  if (data === undefined) {
    const currentConfig = initPermConfig;
    return Object.assign(currentConfig, pair);
  } else {
    const currentConfig = JSON.parse(data) as GusPermConfig;
    return Object.assign(currentConfig, pair);
  }
};

const resolveConfigPair = (pair: string) => {
  const valid = pair.match(/([A-Za-z])=(".+"|[^\s]+)/);
  if (!valid) {
    return null;
  } else {
    const breakpoint = pair.indexOf('=');
    const key = pair.substring(0, breakpoint) as GusPermConfigKey;
    if (key in initPermConfig) {
      const value = pair.substring(breakpoint + 1);
      return { [key]: value };
    } else {
      return null;
    }
  }
};
