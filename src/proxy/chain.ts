const chainObject: GusChain = {
  init: 'dead',
  add: 'dead',
  commit: 'dead',
  push: 'dead',
};

const chainHandler: ProxyHandler<typeof chainObject> = {
  set: (target, prop: GusChainProps, value: GusChainValues) => {
    target[prop] = value;
    return true;
  },
  get: (target, prop: GusChainProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const chain = new Proxy(chainObject, chainHandler);
