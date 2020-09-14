'use strict';

const fs = require('fs')
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
  source: fs.readFileSync('./2020-09-13/hr2w_web_data_active.xlsx') // fs.readFileSync return a Buffer
});

fs.writeFile('./violations-unformatted.json', JSON.stringify(result), 'utf8', function() {
  console.log('done')
})

// console.log(result)
