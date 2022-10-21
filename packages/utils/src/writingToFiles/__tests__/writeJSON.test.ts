import { writeJSON } from '../writeJSON';

it('example test', async () => {
  writeJSON('./packages/utils/example', 'data', { a: 1 });
});
