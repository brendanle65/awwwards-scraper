export const siteVersionThree = {
  scrapeUri: $ => {
    const link = $('.js-visit-item');
    return $(link).attr('href');
  },

  scrapeTitle: $ => {
    const box = $('.box-info');
    const heading = box.find('h1');
    return heading.find('a').text().trim();
  },

  scrapeDescription: $ => {
    const block = $('.box-page-info');
    return block.find('h3').text().trim();
  },

  scrapeCreator: $ => {
    const box = $('.box-info');
    const by = box.find('.by');
    return by.find('strong').first().text().trim();
  },

  scrapeCountry: $ => {
    const box = $('.box-info');
    const by = box.find('.by');
    return $(by.find('strong').toArray()[1]).text().trim();
  },

  scrapeCategories: $ => {
    const block = $('.box-page-info');
    const list = block.find('.list-tags');
    const items = list.find('.item');
    const tags = items.toArray().map(e => $(e).text().trim());
    return tags.filter(tag => tag.indexOf('sites') < 0);
  },

  scrapeColors: $ => {
    const block = $('.box-page-info');
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
