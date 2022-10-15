import cheerio from 'cheerio';
import axios from 'axios';
import { IWebReport, DocumentScraper } from '../../../types';

export const scrapeWebReportDoc: DocumentScraper<IWebReport> = async url => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const box = $('.box-info');
  const by = box.find('.by');
  const overall = parseFloat($(by.find('strong').toArray()[2]).text().trim());
  const notes = $('.box-notesite');
  const categories = notes.find('li');
  const subscores = {} as Omit<IWebReport, 'url' | 'overall'>;
  categories.toArray().forEach(e => {
    subscores[$(e).attr('class').substring(27)] = parseFloat($(e).attr('data-note'));
  });
  delete subscores['mobile'];

  return {
    url: url,
    overall: overall,
    ...subscores
  };
};
