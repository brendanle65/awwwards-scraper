import cheerio from 'cheerio';
import axios from 'axios';
import { ISite, DocumentScraper } from '../../types';
import { siteVersionOne } from './siteVersionOne';
import { siteVersionTwo } from './siteVersionTwo';
import { siteVersionThree } from './siteVersionThree';

export const scrapeSiteDoc: DocumentScraper<ISite> = async url => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  let version;

  const header = $('.box-breadcrumb');
  const type = header.find('a').text().trim();

  if ($('.box-notesite').length > 0) version = siteVersionTwo;
  else if (type === 'Nominees') version = siteVersionOne;
  else version = siteVersionThree;

  const link = version.scrapeUri($);
  const name = version.scrapeTitle($);
  const description = version.scrapeDescription($);
  const creator = version.scrapeCreator($);
  const country = version.scrapeCountry($);
  const colors = version.scrapeColors($);
  const likes = version.scrapeLikes($);
  const categories = version.scrapeCategories($);

  return {
    url: link,
    name: name,
    description: description,
    creator: creator,
    country: country,
    colors: colors,
    categories: categories,
    likes: likes
  };
};
