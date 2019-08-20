'use strict';

const fs = require('fs')
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
  source: fs.readFileSync('./inventory_map_details.xls')
});

fs.writeFile('./map_details.json', JSON.stringify(result), 'utf8', function() {
  console.log('done')
})

const result2 = excelToJson({
  source: fs.readFileSync('./inventory_map_summary.xls')
});

fs.writeFile('./map_summary.json', JSON.stringify(result2), 'utf8', function() {
  console.log('done')
})


