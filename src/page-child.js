const axios = require('axios');
const cheerio = require('cheerio');

const urlChild = 'https://www.gov.br/pt-br/noticias/energia-minerais-e-combustiveis/2023/05/canal-de-denuncias-do-governo-ja-recebeu-mais-de-mil-denuncias-contra-postos-de-combustiveis'

axios.get(urlChild).then(response => {
  const $ = cheerio.load(response.data);
  
  const title = $('.documentFirstHeading').text()
  const imgUrl = $('#media img').attr('src')
  const date = $('.documentPublished .value').text()
  const newsText = $('div[property="rnews:articleBody"]').text()
  console.log({title, imgUrl, date, newsText});
})