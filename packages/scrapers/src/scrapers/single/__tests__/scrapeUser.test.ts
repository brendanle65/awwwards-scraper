import { scrapeUser } from '../scrapeUser';

it('example test', async () => {
  const user = await scrapeUser('https://www.awwwards.com/obys/submissions');
  console.log(user);
});
