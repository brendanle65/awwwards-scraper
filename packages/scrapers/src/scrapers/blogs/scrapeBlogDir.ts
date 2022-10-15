import cheerio from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL, BLOG_DIRECTORY_LINK } from '../../constants';
import { DirectoryScraper } from '../../types';

export const scrapeBlogDir: DirectoryScraper = async idx => {
  const { data: html } = await axios.get(`${BLOG_DIRECTORY_LINK}/?page=${idx}`);
  const $ = cheerio.load(html);
  const content = $('.content-view');
  const list = content.find('.list-items');
  const blockContent = list.find('.rollover');
  const hyperLinks = blockContent.find('a');
  return hyperLinks.toArray().map(e => BASE_SITE_URL + $(e).attr('href'));
};
