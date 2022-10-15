import cheerio from 'cheerio';
import axios from 'axios';
import { IMobileReport, ICriteria, DocumentScraper } from '../../../types';

export const scrapeMobileReportDoc: DocumentScraper<IMobileReport> = async url => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const name = scrapeName($);
  const scores = scrapeScores($);
  const breakdowns = scrapeBreakdowns($);
  return {
    url: url,
    name: name,
    scores: {
      overall: scores[4],
      friendliness: {
        overall: scores[0],
        breakdown: breakdowns[0]
      },
      performance: {
        overall: scores[1],
        breakdown: breakdowns[1]
      },
      usability: {
        overall: scores[2],
        breakdown: breakdowns[2]
      },
      pwa: {
        overall: scores[3],
        breakdown: breakdowns[3]
      }
    }
  };
};

const scrapeName = $ => {
  const breadcrumb = $('.box-breadcrumb');
  const leftBox = breadcrumb.find('.box-left');
  return leftBox.find('strong').text().trim();
};

const scrapeScores = $ => {
  const tuple = [];
  const box = $('.js-notes');
  const scores = box.find('.circle-note-progress');
  scores.each((idx, elem) => {
    tuple.push(parseInt($(elem).attr('data-note')));
  });
  return tuple;
};

const scrapeBreakdowns = $ => {
  const body = $('.body');
  const categories = body.find('.category');
  const accordions = categories.find('.accordion');
  const content = [];
  accordions.each((idx, elem) => {
    const sections = $(elem).find('section');
    const data = [];
    sections.each((idx, elem) => {
      const color = $(elem).attr('class');
      const text = $(elem).find('.actual-title').text();
      const value = $(elem).find('.value').text();
      const obj: ICriteria = {
        text: text,
        pass: color === 'green'
      };
      if (value) obj.value = value;
      data.push(obj);
    });
    content.push(data);
  });
  return [content[0], [...content[1], ...content[2], ...content[3]], content[4], content[5]];
};
