
const axios = require ('axios');
const {decode} = require('html-entities');
const lang = 'us';
const itemID = '4917';
const cheerio = require ('cheerio');
const level = '0';

axios(`https://bdocodex.com/tip.php?id=item--${itemID}&enchant=${level}&l=${lang}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://bdocodex.com/us/weapon/morgenshtern/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(file =>{
  const result = [];
  const f = file.data;
  const $ = cheerio.load(f);
  const name = $('#item_name').eq(0).text().trim();
  const type = $('td>span').eq(3).text();
  const stat1 = $('td>span').slice(0).eq(4).text();
  const stat2 = $('td>span').slice(0).eq(5).text().trim();
  const stat3 = $('td>span').slice(0).eq(6).text().trim();
  const stat4 = $('td>span').slice(0).eq(7).text().trim();
  const stat5 = $('td>span').slice(0).eq(8).text().trim();
  const desc1 = $('#edescription>span').text().trim();
  result.push({type:type,name:name,stat1:stat1, stat2:stat2,stat3:stat3,stat4:stat4,stat5:stat5,desc1:desc1});
  console.log(result);
});
// Details for items
