const axios = require ('axios');
const c = require('nested-property');
const {decode} = require('html-entities');
const base = 'https://bdocodex.com';
const lang = 'us';
const fs = require ('fs');
//const encoded = encodeURI(query);

axios(`https://bdocodex.com/query.php?a=items&type=materials&l=${lang}`).then( file =>{
  const result = [];
  const f = file.data.aaData;
  for (let r=0; r<f.length;r++) {
    const id = c.get(f,`${r}.0`);
    if (id === undefined) {continue;}
    const name = c.get(f, `${r}.2`).split('<span></span>');
    const n1 = name[1].split('</b></a>');
    const n2 = n1[0];
    const cName = decode(n2);
    const dirtyLink = c.get(f, `${r}.2`).split('<a href="');
    const link2 = dirtyLink[1].split('" class=');
    const cLink = link2[0];
    result.push({id:id,name:cName,link:base+cLink});
    //result +=(`${id}:[${cName}](${base+cLink}),type:${type}`)+'\n';
  } //for end of line
  fs.writeFileSync('./json_us/material_us.json',JSON.stringify(result,null,2) );
});
//Example of Materials Collections
