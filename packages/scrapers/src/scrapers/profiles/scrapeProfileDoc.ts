import cheerio from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL } from '../../constants';
import { IProfile, DocumentScraper } from '../../types';

export const scrapeProfileDoc: DocumentScraper<IProfile> = async url => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const name = scrapeName($);
  const location = scrapeLocation($);
  const description = scrapeDescription($);
  const projects = scrapeProjects($);
  const awards = scrapeAwards($);

  const profile: IProfile = {
    url: url,
    name: name,
    location: location,
    description: description,
    projects: projects,
    awards: awards
  };

  return profile;
};

const scrapeName = $ => {
  const profile = $('.box-center');
  return profile.find('.heading-medium').text().trim();
};

const scrapeLocation = $ => {
  const profile = $('.box-center');
  return profile.find('.text-gray').text().trim();
};

const scrapeDescription = $ => {
  const profile = $('.box-center');
  return profile.find('h2').text().trim();
};

const scrapeProjects = $ => {
  const inner = $('.inner');
  const list = inner.find('.list-datas');
  const type = list.find('strong');
  if (type.text().trim().includes('Projects')) {
    const blockContent = inner.find('.rollover');
    const boxPhoto = blockContent.find('.box-photo');
    const hyperLinks = boxPhoto.parent();
    return hyperLinks.toArray().map(e => BASE_SITE_URL + $(e).attr('href'));
  } else return null;
};

const scrapeAwards = $ => {
  const header = $('.box-right');
  const awards = header.find('.borders').text().trim();
  return parseInt(awards);
};
