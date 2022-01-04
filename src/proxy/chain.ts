const chainObject: GCChain = {
  init: 'dead',
  add: 'dead',
  commit: 'dead',
  push: 'dead',
};

const chainHandler: ProxyHandler<typeof chainObject> = {
  set: (target, prop: GCChainProps, value: GCChainValues) => {
    target[prop] = value;
    return true;
  },
  get: (target, prop: GCChainProps) => {
    return prop in target ? target[prop] : undefined;
  },
};

export const chain = new Proxy(chainObject, chainHandler);
