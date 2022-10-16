import { load } from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL, DIRECTORIES } from '../../constants';
import { DirectoryScraper } from '../../types';

export const scrapeDirectory: DirectoryScraper = async (type: keyof typeof DIRECTORIES, idx: number) => {
  const { data: html } = await axios.get(`${BASE_SITE_URL}${DIRECTORIES[type]}/?page=${idx}`);
  const $ = load(html);
  const content = $('.grid-sites');
  const list = content.find('.js-collectable');
  const links = list.find('.figure-rollover__link');
  return links.toArray().map(e => BASE_SITE_URL + $(e).attr('href'));
};
