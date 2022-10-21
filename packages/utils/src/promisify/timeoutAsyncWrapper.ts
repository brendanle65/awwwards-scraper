// resolve promise with timeout
export const timeoutAsyncWrapper = (func: () => any, timeout: number) =>
  new Promise(resolve => setTimeout(() => resolve(func()), timeout));
