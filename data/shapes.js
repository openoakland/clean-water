var toJSON = require('shp2json');

var fs = require("fs");
var myFile = fs.createWriteStream("locations.json");

//toJSON(process.stdin).pipe(process.stdout);
// process.stdin.resume();
 
// or
 
toJSON.fromShpFile('./shapefiles/EC_Summary_Apr2019.shp').pipe(myFile);