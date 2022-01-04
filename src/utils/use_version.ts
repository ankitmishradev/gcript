import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

import { config } from '../proxy';

const pkgJsonPath = path.join(__dirname, '../../package.json');

const useVersion = () => {
  try {
    const data = fs.readFileSync(pkgJsonPath, 'utf-8');
    const pkgInfo = JSON.parse(data) as { version: string };
    config.global.version = pkgInfo.version;
  } catch (error) {
    const localProcess = shell.exec('npm ls gus --depth=0', { silent: true });

    const localCurrentVersion = localProcess.stdout.match(
      /gus@[0-9]\.[0-9]\.[0-9]/,
    );
    if (!localCurrentVersion) {
      const globalProcess = shell.exec('npm ls -g gus --depth=0', {
        silent: true,
      });

      const globalCurrentVersion = globalProcess.stdout.match(
        /gus@[0-9]\.[0-9]\.[0-9]/,
      );
      config.global.version = globalCurrentVersion![0].split('@')[1];
    } else {
      config.global.version = localCurrentVersion![0].split('@')[1];
    }
  }
};

export default useVersion;
