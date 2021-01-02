
const axios = require ('axios');
const {decode} = require('html-entities');
const lang = 'us';
const recipeID = '211';
const cheerio = require ('cheerio');

axios(`https://bdocodex.com/tip.php?id=recipe--${recipeID}&l=${lang}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://bdocodex.com/us/recipes/culinary/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(res => {
const result = [];
const html = res.data;
const $ = cheerio.load(html);
const name = $('#item_name').text();
const lvl = $('td>span').eq(3).text();
const category = $('.yellow_text').slice(0).eq(0).text();
let qtty1 = $('a.qtooltip').slice(0).eq(0).text().trim().padStart(1,1);
const mats1 = $('a.qtooltip').slice(0).eq(1).text().trim().padStart(1,1);
const qtty2 = $('a.qtooltip').slice(0).eq(2).text().trim().padStart(1,1);
const mats2 = $('a.qtooltip').slice(0).eq(3).text().trim().padStart(1,1);
const qtty3 = $('a.qtooltip').slice(0).eq(4).text().trim().padStart(1,1);
const mats3 = $('a.qtooltip').slice(0).eq(5).text().trim().padStart(1,1);
const qtty4 = $('a.qtooltip').slice(0).eq(6).text().trim().padStart(1,1);
const mats4 = $('a.qtooltip').slice(0).eq(7).text().trim().padStart(1,1);
const qtty5 = $('a.qtooltip').slice(0).eq(8).text().trim().padStart(1,1);
const mats5 = $('a.qtooltip').slice(0).eq(9).text().trim().padStart(1,1);
result.push({lvl:lvl,category:category, name:name, mats1:mats1,qtty1:qtty1,mats2:mats2,qtty2:qtty2,mats3:mats3,qtty3:qtty3,mats4:mats4,qtty4:qtty4,mats5:mats5,qtty5:qtty5});
console.log(result);
})
//Recipes for Alchemy and Cooking