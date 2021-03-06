import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../config.json');

const useConfigFile = (key: GCPermConfigKey) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonConfig = JSON.parse(data) as GCPermConfig;

    return jsonConfig[key];
  } catch (error) {
    return undefined;
  }
};

export default useConfigFile;
