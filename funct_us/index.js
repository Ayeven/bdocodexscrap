const fs = require ('fs');
const arr1 = require ('./json_us/material_us.json');
const arr2 = require ('./json_us/consumables_us.json');

const arr3 = arr1.concat(arr2);
//console.log(arr3);
fs.writeFileSync('./json_us/combine_us.json',JSON.stringify(arr3,null,2));
// Combine items