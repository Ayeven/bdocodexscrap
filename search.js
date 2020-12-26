
const puppeteer = require('puppeteer')
const cheerio = require ('cheerio');
const base = 'https://bdocodex.com';
const url = `https://bdocodex.com/us/search/Milk`;

   const a = puppeteer.launch({headless:true, slowMo:200,args: ['--no-sandbox', '--disable-setuid-sandbox'] }) // Change headless to true so browser didn't launch
   .then(browser => browser.newPage())
   .then(async page => {await page.goto(url)
                //await page.select("select.form-control.input-sm","10") // Drop down how many data to show (10,25,50,100,150,200)
                await page.click("input#SearchTable_object_1.dt_qfilter") // Item Checkbox
                //await page.click("input#SearchTable_object_2.dt_qfilter") // NPC Checkbox
                //await page.click("input#SearchTable_object_3.dt_qfilter") // Quest Checkbox
                //await page.click("input#SearchTable_object_4.dt_qfilter") // Skill Checkbox
                //await page.click("input#SearchTable_object_5.dt_qfilter") // Worker Skill
                //await page.click("input#SearchTable_object_6.dt_qfilter") // Design
                //await page.click("input#SearchTable_object_7.dt_qfilter") // Recipe
                //await page.click("input#SearchTable_object_8.dt_qfilter") // Achievement
                //await page.click("input#SearchTable_object_9.dt_qfilter") // Knowledge
                //await page.click("input#SearchTable_object_10.dt_qfilter") // Guild Quest
                //await page.click("input#SearchTable_object_11.dt_qfilter") // Recipe (Processing)
                //await page.click("input#SearchTable_object_12.dt_qfilter") // Title
                //await page.click("input#SearchTable_object_13.dt_qfilter") // Pet
                //await page.click("input#SearchTable_object_14.dt_qfilter") // Mount
                //await page.click("input#SearchTable_object_15.dt_qfilter") // Gatherable Object
                //await page.click("input#SearchTable_object_16.dt_qfilter") // Node 
                //await page.type("input.form-control.input-sm", "Material") // Filter Input textbox
                return await page.content()
    })
        .then(html => {
       const collect =[];
       const $ = cheerio.load(html);
       $('tbody>tr').each(function(){
        const id = $(this).find('.dt-id').text();
        const name = $(this).find('.dt-title.sorting_1').text();
        const link = base + $(this).find('.iconset_wrapper_big>a').attr('href');
        collect.push({id:id, name:name, link:link});
       })
       console.log(collect);
   })
