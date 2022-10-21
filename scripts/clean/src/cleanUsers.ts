import readline from 'readline';
import fs from 'fs';
import { writeJSON, getTerminalArgs } from '@brendanle/awwwards-scrapers-utils';

(async () => {
  const cl = readline.createInterface(process.stdin, process.stdout);
  const questions = [
    {
      question: 'What file do you want the scraped data to be written to?',
      validate: res => null
    },
    {
      question: 'What is the filename of users/creators data you want to clean?',
      validate: res => null
    }
  ];

  let [filename_written, filename_clean] = await getTerminalArgs(cl, questions);

  const raw = fs.readFileSync(`../../data/${filename_clean}`, { encoding: 'utf8' });
  let creators = JSON.parse(raw).data;

  creators = [...new Set(creators)];

  creators.forEach(creator => {
    if (creator.location === '') delete creator.location;
    if (creator.description === '') delete creator.description;
  });

  creators.forEach(creator => {
    const location = creator.location;
    if (location) {
      const breakIndex = location.indexOf('-');
      if (breakIndex !== -1) creator.location = location.substring(0, breakIndex - 1);
    }
  });

  const date = new Date();
  writeJSON('../../data', filename_written, creators, {
    type: 'User',
    date
  });
})();
