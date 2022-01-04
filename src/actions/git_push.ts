import readline from 'readline';
import shell from 'shelljs';

import message from '../utils/message';
import { chain, config, setOutput } from '../proxy';
import { processAfterCommit, exitProcess } from '../process';

export const gitPush: GusProcess = async () => {
  setOutput({ status: 'running', message: message.push.starting });

  const verification = verifyRemote();
  if (verification !== 'done') {
    return;
  }

  const process = shell.exec(
    `git push ${config.run.remote} ${config.run.branch}`,
    {
      silent: true,
    },
  );

  if (process.code !== 0) {
    chain.push = 'failed';
    setOutput({
      status: 'failed',
      message: message.push.failed,
      log: process.stderr,
    });
  } else {
    chain.push = 'done';
    setOutput({
      status: 'done',
      message: message.push.success,
      log: process.stdout,
    });
  }
};

const verifyRemote = () => {
  console.log('Asdfgh', config.run.remote);
  if (!config.run.remote) {
    chain.push = 'warn';
    setOutput({
      status: 'warn',
      message: message.push.noRemote,
    });
    return 'warn';
  }

  if (config.run.remote?.length === 0) {
    chain.push = 'failed';
    setOutput({
      status: 'failed',
      message: message.push.emptyName,
    });
    return 'failed';
  }

  return 'done';
};

export const resolveGitPushWarn = () => {
  setOutput({ status: 'running', message: message.push.detectRemotes });
  const process = shell.exec('git remote', { silent: true });
  const remoteListStr = process.stdout.trim();

  if (process.code !== 0) {
    setOutput({ status: 'failed', message: message.push.failDetectRemotes });
    exitProcess('1');
  } else {
    if (remoteListStr.length === 0) {
      setOutput({ status: 'handled', message: message.push.findNoRemote });
      addGitRemote();
    } else if (remoteListStr.includes('origin')) {
      setOutput({ status: 'done', message: message.push.findOriginRemote });
      config.run.remote = 'origin';
      processAfterCommit();
    } else {
      setOutput({ status: 'handled', message: message.push.haveRemotes });
      const remoteList = remoteListStr.split('\n');
      chooseGitRemote(remoteList);
    }
  }
};

const addGitRemote = () => {
  const investigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  investigate.question('\n? Enter remote url : ', (remoteUrl) => {
    if (remoteUrl.length === 0) {
      exitProcess(message.push.emptyName); // Exiting due to empty remote url.
    } else {
      investigate.question('? Enter remote name : ', (remoteName) => {
        if (remoteName.length === 0) {
          exitProcess(message.push.emptyName); // Exiting due to empty remote name.
        } else {
          const process = shell.exec(
            `git remote add ${remoteName} ${remoteUrl}`,
          );
          if (process.code === 0) {
            config.run.remote = remoteName;
            investigate.close();
            processAfterCommit(); // Process after resolving git push warning.
          } else {
            exitProcess(
              config.global.trace ? process.stderr : message.push.remoteAddFail,
            ); // Exiting because couldn't add new remote.
          }
        }
      });
    }
  });
};

const chooseGitRemote = (remoteList: string[]) => {
  let remoteListStr = '> ';

  for (let i = 0; i < remoteList.length; i++) {
    remoteListStr = remoteListStr + `${i + 1}. ${remoteList[i]}  `;
  }

  console.log(remoteListStr);

  const investigate = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  investigate.question(
    '? Enter remote name from the above list or another remote url : ',
    (remote) => {
      if (remote.length === 0) {
        exitProcess(message.push.noUse); // Exiting because empty remote entered.
      } else {
        config.run.remote = remote;
        investigate.close();
        processAfterCommit(); // Process after resolving git push warning.
      }
    },
  );
};
