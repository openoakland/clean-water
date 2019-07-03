let fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch('https://www.waterboards.ca.gov/water_issues/programs/hr2w/')
  .then(function(response) {
    return response.text();
  })
  .then(function(myText) {
    const $ = cheerio.load(myText);
    // console.log(myText);
    let activeTitle = $('a[href="docs/data/hr2w_web_data_active.xlsx"]').text();
    console.log(activeTitle.split('(')[1].replace(')',''));
    let pastTitle = $('a[href="docs/data/hr2w_web_data_rtc.xlsx"]').text();
  });

let activeUrl = 'https://www.waterboards.ca.gov/water_issues/programs/hr2w/docs/data/hr2w_web_data_active.xlsx';
let pastUrl = 'https://www.waterboards.ca.gov/water_issues/programs/hr2w/docs/data/hr2w_web_data_rtc.xlsx';

