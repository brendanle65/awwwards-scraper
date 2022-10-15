import cheerio from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL, WEB_REPORT_DIRECTORY_LINK } from '../../../constants';
import { DirectoryScraper } from '../../../types';

export const scrapeWebReportDir: DirectoryScraper = async idx => {
  const { data: html } = await axios.get(`${WEB_REPORT_DIRECTORY_LINK}/?page=${idx}`);
  const $ = cheerio.load(html);
  const content = $('.content-view');
  const list = content.find('.list-items');
  const items = list.find('.box-item');
  return items.toArray().map(e => BASE_SITE_URL + $(e).find('a').attr('href'));
};
