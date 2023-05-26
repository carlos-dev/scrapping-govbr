const axios = require('axios');
const cheerio = require('cheerio');

const urlParent = 'https://www.gov.br/pt-br/noticias'

/**
 * Extracts data from a website given a link using Axios and Cheerio.
 *
 * @param {string} link - The URL of the website to extract data from.
 * @return {void} This function does not return anything.
 */
const extractData = (url) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    
    const title = $('.documentFirstHeading').text()
    const imgUrl = $('#media img').attr('src')
    const date = $('.documentPublished .value').text()
    const newsText = $('div[property="rnews:articleBody"]').text()
    console.log({title, imgUrl, date, newsText});
  })
}

const getLinks = axios.get(urlParent).then(response => {
  const $ = cheerio.load(response.data);
  const links = [];

  $('.summary.url').each((index, element) => {
    const link = $(element).attr('href');

    links.push(link);
  })

  return links;
})

const main = async () => {
  const links = await getLinks;
  links.map(link => {
    extractData(link);
  })
}

main()