const axios = require ('axios');
const c = require ('nested-property');
const {decode} = require ('html-entities');
const base = 'https://bdocodex.com';
const lang = 'th';
const query = 'ขวาน'; //Axe
const encoded = encodeURI(query); //encode special characters
const fs = require ('fs');

axios({url:`https://bdocodex.com/query.php?a=search&l=${lang}&sq=${encoded}`,
  headers:{"x-requested-with": "XMLHttpRequest"},
  baseURL: "https://bdocodex.com/th/search/",
  method: "GET",
  responseType: "json",
  withCredentials: false,
  responseEncoding:'utf8',
  data:{}
}).then( file =>{
  const result = [];
  const f = file.data.aaData;
  for (let r=0; r<5;r++) { //How long data aqcuired can be control by r length. (eg. r<10) will get only 10 results
    const id = c.get(f,`${r}.0`);
    if (id === undefined) {continue;}
    const type = c.get(f,`${r}.4.display`);
    const name = c.get(f, `${r}.2`).split('<b>');
    const n1 = name[1].split('</b></a>');
    const n2 = n1[0];
    const cName =n2;
    const dirtyLink = c.get(f, `${r}.2`).split('<a href="');
    const link2 = dirtyLink[1].split('" class=');
    const cLink = link2[0];
    result.push({"id":id,"type":type,"name":cName,"link":base+cLink});
    //result +=(`${id}:[${cName}](${base+cLink}),type:${type}`)+'\n';
  } //for end of line
  fs.writeFileSync('search_th.json',JSON.stringify(result,null,2) );
  // console.log(result);
});
//Example query in Thai Language
