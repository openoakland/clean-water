// read all the files in docs/data
const { readDirDeep, readDirDeepSync } = require('read-dir-deep');
const fs = require('fs');
let count = 0;

async function readFiles(dir) {
  const files = await readDirDeep(dir);

  for(let i = 0;i<files.length;i++) {
    let file = files[i];
    // if file starts with loc-
    // get the lat, lon
    if(file.indexOf('loc-') > -1 && count < 3) {

      let data = JSON.parse(fs.readFileSync('./docs/data/'+file,'utf8'))
      // console.log(data.geometry.coordinates);
      let url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${data.geometry.coordinates[1]}%2C${data.geometry.coordinates[0]}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=kxvqC8XZhygxmCro44qf&app_code=t_PaEBxbfoT7ds8t0olQ0A`;
      
      console.log(url);

      // fetch that url
      // encode the returned address and then
      let address = 'Pleasanton%2C%20CA%2094566%2C%20United%20States';
      let civicUrl = `https://content.googleapis.com/civicinfo/v2/representatives?address=${address}&key=AIzaSyDTcp0OAqLXNo-F195jBAoxO-e4ywpiZoI`;

      // get the representative
      // write data to the loc file we opened

      count++;

    }
  }

}
readFiles('./docs/data');