// read all the files in docs/data
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');
const fs = require('fs');
const fetch = require('node-fetch');
let count = 0;
let reqCount = 0;

async function readFiles(dir) {
  const files = await readDirDeep(dir);

  let timeIncrement = 300;
  for(let i = 0;i<files.length;i++) {
    let file = files[i];
    // if file starts with loc-
    // get the lat, lon
    if(file.indexOf('loc-') > -1) { // && count < 550
      let myPath = './docs/data/' + file.replace('loc-','leg-');
      // console.log(myPath)
      if(!fs.existsSync(myPath)) {
        reqCount++;

        let data = JSON.parse(fs.readFileSync('./docs/data/'+file,'utf8'))
        console.log('need '+file)
        setTimeout( function() {
          getRepresentatives(data, file);
        }, reqCount * timeIncrement)
  
      } else {
        // console.log('got '+file)
      }
      // console.log(data.geometry.coordinates);
      // fetch that url
      // encode the returned address and then
      // let address = 'Pleasanton%2C%20CA%2094566%2C%20United%20States';
      // let civicUrl = `https://content.googleapis.com/civicinfo/v2/representatives?address=${address}&key=AIzaSyDTcp0OAqLXNo-F195jBAoxO-e4ywpiZoI`;

      // get the representative
      // write data to the loc file we opened

      count++;

    }
  }

}
readFiles('./docs/data');

// find the  https://openstates.org/find_your_legislator/?lat=37.8056148&lon=-122.2725945

function getAddress(data, callback) {
  let url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${data.geometry.coordinates[1]}%2C${data.geometry.coordinates[0]}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=kxvqC8XZhygxmCro44qf&app_code=t_PaEBxbfoT7ds8t0olQ0A`;  
}

function getRepresentatives(data, file) {
  let filename = './docs/data/'+file.replace('loc-','leg-');
  // console.log(filename);

  let url = `https://openstates.org/find_your_legislator/?lat=${data.geometry.coordinates[1]}&lon=${data.geometry.coordinates[0]}`
  fetch(url)
  .then(res => res.json())
  .then(json => {
    let legName = json.legislators[0].name;
    if(legName) {
      console.log('writing '+json.legislators[0].name)
      fs.writeFileSync(filename,JSON.stringify(json),'utf8');
    } else {
      console.log('WTF: '+file)
    }
    

  });
  
}

// identify all districts, both assembly and senate, combien into one pulldown titled legistlative district
/*
https://openstates.org/find_your_legislator/
https://openstates.org/find_your_legislator/?lat=37.8056148&lon=-122.2725945
*/