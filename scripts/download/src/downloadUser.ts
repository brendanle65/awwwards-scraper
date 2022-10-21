import fs from 'fs';
import { scrapeUser } from '@brendanle/awwwards-scrapers-scrapers';
import { timeoutAsyncWrapper, writeJSON, getTerminalArgs } from '@brendanle/awwwards-scrapers-utils';
import { SCRAPE_INTERVAL_TIMER } from './constants';
import readline from 'readline';

(async () => {
  const cl = readline.createInterface(process.stdin, process.stdout);
  const questions = [
    {
      question: 'What is the filename of the list of user links you want to scrape?',
      validate: res => null
    },
    {
      question: 'What file do you want the scraped data to be written to?',
      validate: res => null
    }
  ];
  let [filename_list, filename_written] = await getTerminalArgs(cl, questions);

  const raw = fs.readFileSync(`../../data/${filename_list}`, { encoding: 'utf8' });
  const creators = JSON.parse(raw).data.map(datum => datum.creators);
  const links = creators.map(creator => creator.map(({ url }) => url)).flat();

  const data = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i] + 'submissions';
    console.log(`Scraping user data of link ${link}`);
    data.push(await timeoutAsyncWrapper(() => scrapeUser(link), SCRAPE_INTERVAL_TIMER));
  }

  const date = new Date();
  console.log(`Stopped scraping user data at ${date}`);
  writeJSON('../../data', filename_written, data, {
    type: 'User',
    date
  });
})();
