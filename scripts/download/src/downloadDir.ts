import { scrapeDirectory, DIRECTORIES } from '@brendanle/awwwards-scrapers-scrapers';
import { timeoutAsyncWrapper, writeJSON, getTerminalArgs } from '@brendanle/awwwards-scrapers-utils';
import { SCRAPE_INTERVAL_TIMER } from './constants';
import readline from 'readline';

(async () => {
  const cl = readline.createInterface(process.stdin, process.stdout);
  const questions = [
    {
      question:
        'Which directory do you want to scrape? (Nominee, Honorable, Mobile_Excellence, Developer, Site_Of_The_Day, Site_Of_The_Month, Site_Of_The_Year)',
      validate: res => (res in DIRECTORIES ? null : 'Please try again. Invalid directory provided.')
    },
    {
      question: 'Which page of the directory do you want to start scraping?',
      validate: res => (!isNaN(parseInt(res)) ? null : 'Please try again. Invalid page number provided.')
    },
    {
      question: 'Which page of the directory do you want to end scraping?',
      validate: res => (!isNaN(parseInt(res)) ? null : 'Please try again. Invalid page number provided.')
    },
    {
      question: 'What file do you want the scraped data to be written to?',
      validate: res => null
    }
  ];
  let [type, start, end, filename] = await getTerminalArgs(cl, questions);
  start = parseInt(start);
  end = parseInt(end);

  let links = [];
  for (var i = start; i <= end; i++) {
    console.log(`Scraping ${type} data of page ${i}`);
    links.push(
      await timeoutAsyncWrapper(() => scrapeDirectory(type as keyof typeof DIRECTORIES, i), SCRAPE_INTERVAL_TIMER)
    );
  }

  links = links.flat();

  const date = new Date();
  console.log(`Stopped scraping ${type} data at page ${i - 1} at ${date}`);
  writeJSON('../../data', filename, links, {
    type,
    date
  });
})();
