import fs from 'fs';
import { scrapeWebsite } from '@brendanle/awwwards-scrapers-scrapers';
import { timeoutAsyncWrapper, writeJSON, getTerminalArgs } from '@brendanle/awwwards-scrapers-utils';
import { SCRAPE_INTERVAL_TIMER } from './constants';
import readline from 'readline';

(async () => {
  const cl = readline.createInterface(process.stdin, process.stdout);
  const questions = [
    {
      question: 'What is the filename of the list of website links you want to scrape?',
      validate: res => null
    },
    {
      question: 'What file do you want the scraped data to be written to?',
      validate: res => null
    }
  ];
  let [filename_list, filename_written] = await getTerminalArgs(cl, questions);

  const raw = fs.readFileSync(`../../data/${filename_list}`, { encoding: 'utf8' });
  const links = JSON.parse(raw).data;

  const data = [];
  for (let i = 0; i < links.length; i++) {
    console.log(`Scraping site data of link ${links[i]}`);
    data.push(await timeoutAsyncWrapper(() => scrapeWebsite(links[i]), SCRAPE_INTERVAL_TIMER));
  }

  const date = new Date();
  console.log(`Stopped scraping site data at ${date}`);
  writeJSON('../../data', filename_written, data, {
    type: 'Site',
    date
  });
})();
