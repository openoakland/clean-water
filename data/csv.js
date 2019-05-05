const csvFilePath='./hr2w_web_data_active_2-2019.csv'
const csv=require('csvtojson')
const fs = require('fs')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    fs.writeFile('./violations.json', JSON.stringify(jsonObj), 'utf8', function() {
      console.log('done')
    })
    
})