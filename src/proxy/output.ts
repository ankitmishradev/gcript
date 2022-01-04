import { printProcess } from '../process';

const cliOutStatus = ['running', 'failed', 'done', 'warn', 'handled'];

const cliOutObject: GCOutput = {};

const cliOutHandler: ProxyHandler<typeof cliOutObject> = {
  set: (target, prop: GCOutputProps, value: GCOutputStatus | string) => {
    switch (prop) {
      case 'status':
        if (!cliOutStatus.includes(value)) {
          throw new TypeError('The status must be GCCliOutStatus.');
        } else {
          target.status = value as GCOutputStatus;
        }
        break;
      case 'message':
        if (value.length === 0) {
          throw new EvalError('Message can not be empty');
        } else {
          target.message = value;
        }
        break;
      case 'log':
        if (value.length === 0) {
          throw new EvalError('Log can not be empty');
        } else {
          target.log = value;
        }
        break;
      default:
        throw new Error(`Can not set value of undefined property ${prop}`);
    }

    return true;
  },
  get: (target, prop: GCOutputProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const output = new Proxy(cliOutObject, cliOutHandler);

export const setOutput = (obj: GCOutput) => {
  if (!obj.log || obj.log?.length === 0) {
    output.log = obj.message;
  } else {
    output.log = obj.log;
  }
  output.message = obj.message;
  output.status = obj.status;

  printProcess();
};
