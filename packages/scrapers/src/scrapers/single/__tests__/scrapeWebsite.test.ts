import { scrapeWebsite } from '../scrapeWebsite';

it('example test', async () => {
  const website = await scrapeWebsite('https://www.awwwards.com/sites/aawu-m');
  console.log(website);
});
