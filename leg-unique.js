// read all the files in docs/data
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');
const fs = require('fs');
const fetch = require('node-fetch');
let count = 0;

let legislators = new Map();

async function readFiles(dir) {
  const files = await readDirDeep(dir);

  let timeIncrement = 300;
  for(let i = 0;i<files.length;i++) {
    let file = files[i];
    // if file starts with loc-
    // get the lat, lon
    if(file.indexOf('leg-') > -1) {
      count++;
      let data = JSON.parse(fs.readFileSync('./docs/data/'+file,'utf8'))
      // console.log(data)
      data.legislators.forEach( (item) => {
        // console.log(item.name)
        legislators.set(item.name, item);
      })
    }
    if(file.indexOf('loc-') > -1) {
      // count++;
    }
  }
  console.log('total files; '+count)
  console.log('unique legislators: '+legislators.size)

  let uniqueItemArray = [];
  legislators.forEach( (item) => {
    console.log(item.chamber +' '+item.district)
  })
  // CA State Assembly District X
  // CA State Senate District X

  // for each unique legislator create a file with all their water systems
}
readFiles('./docs/data');