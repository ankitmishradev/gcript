import fs from 'fs';
import path from 'path';

import { exitProcess } from '../process';
import { setOutput } from '../proxy';
import message from '../utils/message';

const filePath = path.join(__dirname, '../../config.json');

export const readConfig = (key: string | boolean | undefined) => {
  console.log(message.common.starting);

  setOutput({
    status: 'running',
    message: message.config.readStarting,
  });

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (data) {
      setOutput({
        status: 'handled',
        message: buildReadConfigMessage(data, key),
      });
      exitProcess();
    } else {
      setOutput({
        status: 'handled',
        message: message.config.noConfigFile,
      });
      exitProcess('1');
    }
  });
};

const buildReadConfigMessage = (
  data: string,
  key: string | boolean | undefined,
) => {
  const configuration = JSON.parse(data) as GusPermConfig;
  if (key && key !== true) {
    if (key in configuration) {
      return `> ${key} : ${configuration[key as GusPermConfigKey]}`;
    } else {
      return `> ${key} is not a property of gus configurations.`;
    }
  } else {
    let configListStr = '';
    for (const key in configuration) {
      if (Object.prototype.hasOwnProperty.call(configuration, key)) {
        configListStr += `> ${key} : ${
          configuration[key as GusPermConfigKey]
        }\n`;
      }
    }
    return configListStr;
  }
};
