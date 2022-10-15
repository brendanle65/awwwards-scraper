import cheerio from 'cheerio';
import axios from 'axios';
import { IBlog, DocumentScraper } from '../../types';

export const scrapeBlogDoc: DocumentScraper<IBlog> = async url => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const title = scrapeTitle($);
  const author = scrapeAuthor($);
  const category = scrapeCategory($);
  const date = scrapeDate($);
  const likes = scrapeLikes($);
  const body = scrapeBody($);

  const blog: IBlog = {
    url: url,
    title: title,
    author: author,
    date: date,
    category: category,
    likes: likes,
    body: body
  };

  return blog;
};

const scrapeTitle = $ => {
  const header = $('.header-post');
  return header.find('.heading-large').text().trim();
};

const scrapeAuthor = $ => {
  const header = $('.header-post');
  return header.find('[itemprop="name author"]').text().trim();
};

const scrapeCategory = $ => {
  const header = $('.header-post');
  return header.find('[itemprop="about"]').text().trim();
};

const scrapeDate = $ => {
  const header = $('.header-post');
  return new Date($(header.find('[itemprop="datePublished"]')).attr('content'));
};

const scrapeLikes = $ => {
  const users = $('.js-collect-like');
  const likes = parseInt(users.find('span').text().trim());
  return likes ?? 0;
};

const scrapeBody = $ => {
  const article = $('article');
  return article
    .find('[itemprop="articleBody"]')
    .text()
    .trim()
    .replace(/(\r\n|\n|\r)/gm, '');
};
