import cheerio from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL, MOBILE_REPORT_DIRECTORY_LINK } from '../../../constants';
import { DirectoryScraper } from '../../../types';

export const scrapeMobileReportDir: DirectoryScraper = async idx => {
  const { data: html } = await axios.get(`${MOBILE_REPORT_DIRECTORY_LINK}/?page=${idx}`);
  const $ = cheerio.load(html);
  const content = $('.content-view');
  const list = content.find('.list-items');
  const items = list.find('.box-item');
  return items.toArray().map(e => {
    const link = $(e).find('a').attr('href');
    if (link.indexOf('mobile-sites/') > 0) {
      return `${BASE_SITE_URL}/sites/${link.substring(14)}/mobile-excellence-report`;
    } else {
      return BASE_SITE_URL + link;
    }
  });
};
