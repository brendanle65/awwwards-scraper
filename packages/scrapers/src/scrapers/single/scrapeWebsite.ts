import { load } from 'cheerio';
import axios from 'axios';
import { BASE_SITE_URL } from '../../constants';
import { ISite, SingleScraper } from '../../types';

export const scrapeWebsite: SingleScraper<ISite> = async url => {
  const { data: html } = await axios.get(url);
  const $ = load(html);

  const web_url = $($('.toolbar-bts__item').toArray()[2]).attr('href');

  const metadata = JSON.parse($('[data-single-collectable-model-value]').attr('data-single-collectable-model-value'));
  const name = metadata.title;
  const date = new Date(metadata.createdAt * 1000);
  const categories = metadata.tags;
  const likes = parseInt(metadata.likes);

  const credits = $('.header-floating__left').find('.users-credits__name').toArray();
  const creators = credits.map(elem => {
    const details = $(elem).find('a');
    const name = details.text();
    const url = details.attr('href');
    return {
      name,
      url: BASE_SITE_URL + url
    };
  });

  let colors = [];

  if ($('.list-palette').length > 0) {
    const palatte = $('.list-palette');
    colors = palatte
      .find('.list-palette__name')
      .toArray()
      .map(elem => {
        $(elem).find('strong').remove();
        return $(elem).text().trim();
      });
  } else {
    const palatte = $('.button--tag--color--small');
    colors = palatte.toArray().map(elem => {
      const style = $(elem).attr('style').split(':')[1];
      return style.substring(0, style.length - 1).trim();
    });
  }

  const image = $('.gallery-site__img').toArray()[0];
  const thumbnail = $(image).attr('src');

  const info: ISite = {
    web_url: web_url,
    awwwards_url: url,
    thumbnail,
    name,
    date,
    categories,
    likes,
    creators,
    colors
  };

  if ($('.c-heading-score__note').length > 0) {
    const scores = $('.c-heading-score__note').toArray();

    scores.forEach(score => {
      const totalText = $(score).text();
      const total = parseFloat(totalText.substring(2, totalText.indexOf('/')));

      const parentBox = $(score).parent();
      const data = parentBox
        .parent()
        .parent()
        .find('[data-note]')
        .toArray()
        .map(elem => parseFloat($(elem).attr('data-note')));
      if (parentBox.text().includes('SOTD')) {
        info.sotd = {
          total: total,
          design: data[0],
          usability: data[1],
          creativity: data[2],
          content: data[3]
        };
      } else if (parentBox.text().includes('DEV')) {
        info.dev = {
          total: total,
          semantics: data[0],
          animations: data[1],
          accessibility: data[2],
          wpo: data[3],
          responsive_design: data[4],
          markup: data[5]
        };
      }
    });
  }

  return info;
};
