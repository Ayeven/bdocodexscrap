
const axios = require ('axios');
const c = require('nested-property');
const {decode} = require('html-entities');
const base = 'https://bdocodex.com';
const lang = 'us';
const query = 'Strawberry'; //Axe
const encoded = encodeURI(query);
const fs = require ('fs');


axios({url:`https://bdocodex.com/query.php?a=search&l=${lang}&sq=${encoded}`,
  headers:{"x-requested-with": "XMLHttpRequest"},
  baseURL: "https://bdocodex.com/us/search/",
  method: "GET",
  responseType: "json",
  withCredentials: false,
  responseEncoding:'utf8',
  data:{}
}).then( file =>{
  let result = [];
  const f = file.data.aaData;
  for (let r=0; r<5;r++) {
    const id = c.get(f,`${r}.0`);
    if (id === undefined) {continue;}
    const type = c.get(f,`${r}.4.display`);
    const name = c.get(f, `${r}.2`).split('<b>');
    const n1 = name[1].split('</b></a>');
    const n2 = n1[0];
    const cName =decode(n2);
    const dirtyLink = c.get(f, `${r}.2`).split('<a href="');
    const link2 = dirtyLink[1].split('" class=');
    const cLink = link2[0];
    result.push({id:id,type:type,name:cName,link:base+cLink});
    //result +=(`${id}:[${cName}](${base+cLink}),type:${type}`)+'\n';
  } //for end of line
  console.log(result);
  fs.writeFileSync('./json_us/search_us.json',JSON.stringify(result,null,2) );
});
