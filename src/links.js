const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.gov.br/pt-br/noticias'

axios.get(url).then(response => {
  const $ = cheerio.load(response.data);
  const links = [];

  $('.summary.url').each((index, element) => {
    const link = $(element).attr('href');

    links.push(link);
  })

  console.log(links);
})