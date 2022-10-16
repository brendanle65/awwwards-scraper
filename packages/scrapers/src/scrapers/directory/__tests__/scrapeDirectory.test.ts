import { scrapeDirectory } from '../scrapeDirectory';

it('example test', async () => {
  const links = await scrapeDirectory('Site_Of_The_Year', 1);
  console.log(links);
});
