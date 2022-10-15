import cheerio from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL, PROFILE_DIRECTORY_LINK } from '../../constants';
import { DirectoryScraper } from '../../types';

export const scrapeProfileDir: DirectoryScraper = async idx => {
  const { data: html } = await axios.get(`${PROFILE_DIRECTORY_LINK}/?page=${idx}`);
  const $ = cheerio.load(html);
  const content = $('.content-view');
  const list = content.find('.list-items');
  const hyperLinks = list.find('.profile-link');
  return hyperLinks.toArray().map(e => BASE_SITE_URL + $(e).attr('href'));
};
