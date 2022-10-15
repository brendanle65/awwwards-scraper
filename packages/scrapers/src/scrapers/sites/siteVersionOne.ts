export const siteVersionOne = {
  scrapeUri: $ => {
    const link = $('.js-visit-item');
    return $(link).attr('href');
  },

  scrapeTitle: $ => {
    const block = $('.site-details');
    const title = block.find('.title');
    return title.find('h1').text().trim();
  },

  scrapeDescription: $ => {
    const block = $('.site-details');
    return block.find('.read-more').text().trim();
  },

  scrapeCreator: $ => {
    const box = $('.site-details');
    const paragraph = box.find('p');
    return paragraph.find('strong').text().trim();
  },

  scrapeCountry: $ => {
    const box = $('.site-details');
    const paragraph = box.find('p');
    const text = paragraph.text().trim();
    return text.substring(text.indexOf('(') + 1, text.length - 1);
  },

  scrapeCategories: $ => {
    const block = $('.site-details');
    const list = block.find('.list-tags');
    const items = list.find('.item');
    const tags = items.toArray().map(e => $(e).text().trim());
    return tags.filter(tag => tag.indexOf('sites') < 0);
  },

  scrapeColors: $ => {
    const block = $('.site-details');
    const list = block.find('.list-tags');
    const items = list.find('.item-color');
    return items.toArray().map(e => $(e).attr('class').substring(16));
  },

  scrapeLikes: $ => {
    const users = $('.js-collect-like');
    const likes = users.find('span').text().trim();
    return parseInt(likes);
  }
};
