const axios = require ('axios');
const c = require('nested-property');
const {decode} = require('html-entities');
const baseURL = 'https://bdocodex.com';

axios({url:"https://bdocodex.com/query.php?a=search&l=us&sq=Dim Tree Armor",
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
  for (let r=0; r<25||r==f.length;r++) {
    const id = c.get(f,`${r}.0`);
    if (id === undefined) {continue;}
    const type = c.get(f,`${r}.4.display`);
    const name = c.get(f, `${r}.2`).split('<b>');
    const n1 = name[1].split('</b></a>');
    const n2 = n1[0];
    const cName = decode(n2);
    const dirtyLink = c.get(f, `${r}.2`).split('<a href="');
    const link2 = dirtyLink[1].split('" class=');
    const cLink = link2[0];
    //result.push({id:id,type:type,name:cName,link:baseURL+cLink});
    result +=(`${id}:[${cName}](${baseURL+cLink}),type:${type}`)+'\n';
  } //for end of line
  console.log(result);
});
