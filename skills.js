
const puppeteer = require('puppeteer');
const cheerio = require ('cheerio');
const base = 'https://bdocodex.com';
const url = `https://bdocodex.com/de/skills/tamer/`;

puppeteer.launch({headless:false, slowMo:250,args: ['--no-sandbox', '--disable-setuid-sandbox'] }) // Change headless to true so browser didn't launch. --no-sandbox argument for sudo users
  .then(browser => browser.newPage())
  .then(async page => {await page.goto(url);
    await page.click("input#SkillsTable_skill_type_1.dt_qfilter",{clickCount:1}); //Untick combat skills
    await page.select("select.form-control.input-sm","50"); // Drop down how many data to show (10,25,50,100,150,200)
    await page.click("li#SkillsTable_next.paginate_button.next",{clickCount:1}); //Next Button
    return await page.content();
  })
  .then(html => {
    let collect =[];
    const $ = cheerio.load(html);
    $('tbody>tr').each(function() {
      const id = $(this).find('.dt-id').text();
      const name = $(this).find('.dt-title.sorting_1').text();
      const link = base + $(this).find('.iconset_wrapper_big>a').attr('href');
      const lvl = $(this).find('.dt-level').text(); //Level Requirement
      const cls = $(this).find('.dt-zone').text(); //Class
      //collect.push({id:id, name:name, link:link, level:lvl, class:cls}); //Data Constructor
      collect +=(`${id}:[${name}](${link}) Level Required:${lvl} Class:${cls}`) +"\n"; //Another Data formatter
    });
    if (collect.length>10048) {return console.log('Message Too Long');} //Discord character limit is 2048, so it is better to use 10 or 25 drop down
    else {console.log(collect);}
  });
