import { load } from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL } from '../../constants';
import { IUser, SingleScraper } from '../../types';

export const scrapeUser: SingleScraper<IUser> = async url => {
  const { data: html } = await axios.get(url);
  const $ = load(html);

  const user = $('.head-user');
  const name = user.find('.hero-user__title').text();
  const location = user.find('.text-sd').first().text().trim();
  const description = user
    .find('.text-sd')
    .last()
    .text()
    .trim()
    .replace(/[\n\r]+/g, '');
  const submissions = $('.grid-sites')
    .find('.card-site')
    .find('.figure-rollover__link')
    .toArray()
    .map(elem => BASE_SITE_URL + $(elem).attr('href'));

  return {
    url,
    name,
    location,
    description,
    submissions
  };
};
