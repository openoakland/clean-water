'use strict';

const fs = require('fs')
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
  source: fs.readFileSync('./water-data-violations.xlsx') // fs.readFileSync return a Buffer
});

fs.writeFile('./violations.json', JSON.stringify(result), 'utf8', function() {
  console.log('done')
})

// console.log(result)
