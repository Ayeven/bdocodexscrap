
const axios = require ('axios');
const {decode} = require('html-entities');
const lang = 'us';
const itemID = '8847';
const cheerio = require ('cheerio');

axios(`https://bdocodex.com/tip.php?id=design--${itemID}&enchant=0&l=${lang}`).then(file =>{
  const result = [];
  const f = file.data;
  const $ = cheerio.load(f);
  const name = $('#item_name').eq(0).text().trim();
  const type = $('.category_text').text();
  const req1 = $('td').eq(4).text().trim();
  const qtty1 = $('a.qtooltip').eq(0).text().trim().padStart(1,1);
  const mats1 = $('a.qtooltip').eq(1).text().trim().padStart(1,1);
  const qtty2 = $('a.qtooltip').eq(2).text().trim().padStart(1,1);
  const mats2 = $('a.qtooltip').eq(3).text().trim().padStart(1,1);
  const qtty3 = $('a.qtooltip').eq(4).text().trim().padStart(1,1);
  const mats3 = $('a.qtooltip').eq(5).text().trim().padStart(1,1);
  const qtty4 = $('a.qtooltip').eq(6).text().trim().padStart(1,1);
  const mats4 = $('a.qtooltip').eq(7).text().trim().padStart(1,1);
  const qtty5 = $('a.qtooltip').eq(8).text().trim().padStart(1,1);
  const mats5 = $('a.qtooltip').eq(9).text().trim().padStart(1,1);
  const qtty6 = $('a.qtooltip').eq(10).text().trim().padStart(1,1);
  const mats6 = $('a.qtooltip').eq(11).text().trim().padStart(1,1);
  if((mats3 == name) ) { result.push({type:type,name:name,req1:req1, qtty1:qtty1,mats1:mats1,qtty2:qtty2,mats2:mats2});
  console.log(result);} // 2 materials
  else if((mats4 == name) ) { result.push({type:type,name:name,req1:req1, qtty1:qtty1,mats1:mats1,qtty2:qtty2,mats2:mats2, qtty3:qtty3,mats3:mats3});
  console.log(result);} // 3 materials
  else if((mats5 == name) ) { result.push({type:type,name:name,req1:req1, qtty1:qtty1,mats1:mats1,qtty2:qtty2,mats2:mats2, qtty3:qtty3,mats3:mats3,qtty4:qtty4,mats4:mats4});
  console.log(result);} // 4 materials
  else if((mats6 == name) ) { result.push({type:type,name:name,req1:req1, qtty1:qtty1,mats1:mats1,qtty2:qtty2,mats2:mats2, qtty3:qtty3,mats3:mats3,qtty4:qtty4,mats4:mats4,qtty5:qtty5,mats5:mats5});
  console.log(result);} // 5 materials
  else { result.push({type:type,name:name,req1:req1, qtty1:qtty1,mats1:mats1,qtty2:qtty2,mats2:mats2, qtty3:qtty3,mats3:mats3,qtty4:qtty4,mats4:mats4,qtty5:qtty5,mats5:mats5,qtty6:qtty6,mats6:mats6});
  console.log(result);} // 6 materials
});