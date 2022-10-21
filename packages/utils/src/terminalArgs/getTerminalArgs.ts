import { Interface } from 'readline';
import { questionWrapper } from '../promisify/questionWrapper';

interface ITerminalQuestion {
  question: string;
  validate: (res: string) => null | string;
}

export const getTerminalArgs = async (cl: Interface, questions: ITerminalQuestion[]) => {
  const responses = [];
  let i = 0;
  while (i < questions.length) {
    const res = (await questionWrapper(cl, questions[i].question + ': ')) as string;
    const validResponse = questions[i].validate(res);
    if (validResponse !== null) {
      console.log(validResponse);
    } else {
      responses.push(res);
      i++;
    }
  }
  cl.close();
  return responses;
};
