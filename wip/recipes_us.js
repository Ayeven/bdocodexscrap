
const axios = require ('axios');
const {decode} = require('html-entities');//eslint no-unused-vars
const lang = 'tw';
const recipeID = '227';
const cheerio = require ('cheerio');

axios(`https://bdocodex.com/tip.php?id=recipe--${recipeID}&l=${lang}`).then(res => {
  const result = [];
  const html = res.data;
  const $ = cheerio.load(html);
  const name = $('#item_name').text();
  const lvl = $('td>span').eq(3).text();
  const category = $('.yellow_text').slice(0).eq(0).text();
  const qtty1 = $('a.qtooltip').slice(0).eq(0).text().trim().padStart(1,1);
  const mats1 = $('a.qtooltip').slice(0).eq(1).text().trim().padStart(1,1);
  const qtty2 = $('a.qtooltip').slice(0).eq(2).text().trim().padStart(1,1);
  const mats2 = $('a.qtooltip').slice(0).eq(3).text().trim().padStart(1,1);
  const qtty3 = $('a.qtooltip').slice(0).eq(4).text().trim().padStart(1,1);
  const mats3 = $('a.qtooltip').slice(0).eq(5).text().trim().padStart(1,1);
  const qtty4 = $('a.qtooltip').slice(0).eq(6).text().trim().padStart(1,1);
  const mats4 = $('a.qtooltip').slice(0).eq(7).text().trim().padStart(1,1);
  const qtty5 = $('a.qtooltip').slice(0).eq(8).text().trim().padStart(1,1);
  const mats5 = $('a.qtooltip').slice(0).eq(9).text().trim().padStart(1,1);
  if ((mats4==name ) ) {result.push({lvl:lvl,category:category, name:name, mats1:mats1,qtty1:qtty1,mats2:mats2,qtty2:qtty2,mats3:mats3,qtty3:qtty3});
    console.log(result);} // 3 items materials
  else if ((mats5==name ) ) {result.push({lvl:lvl,category:category, name:name, mats1:mats1,qtty1:qtty1,mats2:mats2,qtty2:qtty2,mats3:mats3,qtty3:qtty3,mats4:mats4,qtty4:qtty4});
    console.log(result);} // 4 items materials
  else {result.push({lvl:lvl,category:category, name:name, mats1:mats1,qtty1:qtty1,mats2:mats2,qtty2:qtty2,mats3:mats3,qtty3:qtty3,mats4:mats4,qtty4:qtty4,mats5:mats5,qtty5:qtty5});
    console.log(result);} // 5 items materials
});
//Recipes for Alchemy and Cooking
