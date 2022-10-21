import { Interface } from 'readline';

export const questionWrapper = (cl: Interface, q: string) =>
  new Promise((res, rej) => {
    cl.question(q, answer => {
      res(answer);
    });
  });
