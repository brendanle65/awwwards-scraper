import readline from 'readline';
import { writeJSON, getTerminalArgs } from '@brendanle/awwwards-scrapers-utils';
import { readJSON } from './helpers/readJSON';
import { aggAwardsField } from './helpers/aggAwardsField';
import { aggCountryField } from './helpers/aggCountryField';

(async () => {
  const cl = readline.createInterface(process.stdin, process.stdout);
  const questions = [
    {
      question: 'What file do you want the scraped data to be written to?',
      validate: res => null
    },
    {
      question: 'What is the filename of the sites information you want to aggregate to?',
      validate: res => null
    },
    {
      question: 'What is the filename of the creators data associated with the scraped sites information?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Developer Award?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Honorable Mention Award?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Mobile Excellence Award?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Site of the Day Award?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Site of the Month Award?',
      validate: res => null
    },
    {
      question: 'What is the filename of the links of sites that won the Site of the Year Award?',
      validate: res => null
    }
  ];

  let [filename_written, ...filenames] = await getTerminalArgs(cl, questions);

  let [sites, creators, developers, honorable, mobileExs, SOTDs, SOTMs, SOTYs] = readJSON(filenames);

  aggAwardsField(sites, developers, 'developer');
  aggAwardsField(sites, honorable, 'honorable');
  aggAwardsField(sites, mobileExs, 'mobile excellence');
  aggAwardsField(sites, SOTDs, 'site of the day');
  aggAwardsField(sites, SOTMs, 'site of the month');
  aggAwardsField(sites, SOTYs, 'site of the year');
  aggCountryField(sites, creators);

  const date = new Date();
  writeJSON('../../data', filename_written, sites, {
    type: 'Site',
    date
  });
})();
