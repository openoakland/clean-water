// http://localhost:1339/chronic.html
// need to reset splat sizes at zoom out levels or they overwhelm map
/*
map.on('zoomend', function() {
  var currentZoom = map.getZoom();
});*/
// add analyte filter buttons

let monthsOfData = ["2012-1", "2012-2", "2012-3", "2012-4", "2012-5", "2012-6", "2012-7", "2012-8", "2012-9", "2012-10", "2012-11", "2012-12", "2013-1", "2013-2", "2013-3", "2013-4", "2013-5", "2013-6", "2013-7", "2013-8", "2013-9", "2013-10", "2013-11", "2013-12", "2014-1", "2014-2", "2014-3", "2014-4", "2014-5", "2014-6", "2014-7", "2014-8", "2014-9", "2014-10", "2014-11", "2014-12", "2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12", "2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12", "2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12", "2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8", "2018-9", "2018-10", "2018-11", "2018-12", "2019-1", "2019-2", "2019-3"]; // , "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9"
let monthNames = ['', 'January','February','March','April','May','June','July','August','September','October','November','December']

document.getElementById('slider').addEventListener('input', function(e) {
  var month = parseInt(e.target.value, 10);
  let newMonth = monthsOfData[month];
  let stringMonth = newMonth.split('-')
  document.getElementById('month').innerHTML = 'Retrieving data from '+monthNames[stringMonth[1]]+' '+stringMonth[0];
  resetMap(newMonth)
});

function getMarkerHTML(fillColor, width, height) {
  return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="${width}" height="${height}" viewBox="0 0 1280 1207"
  preserveAspectRatio="xMidYMid meet">
  <metadata>
  Created by potrace 1.15, written by Peter Selinger 2001-2017
  </metadata>
  <g transform="translate(0.000000,1207.000000) scale(0.100000,-0.100000)"
  fill="#${fillColor}" stroke="none">
  <path d="M6880 12059 c-266 -41 -568 -241 -733 -487 -103 -154 -142 -277 -141
  -452 0 -118 3 -137 52 -327 64 -245 140 -483 327 -1013 194 -551 237 -703 238
  -845 1 -97 -14 -145 -58 -184 -65 -57 -162 -62 -350 -19 -78 18 -95 26 -126
  58 -100 104 -124 445 -59 839 32 192 25 254 -34 319 -48 54 -92 67 -216 66
  -94 -1 -131 -6 -203 -28 -192 -58 -373 -162 -498 -286 -98 -97 -133 -162 -134
  -250 0 -126 60 -201 295 -369 285 -204 322 -265 252 -414 -38 -83 -109 -159
  -176 -192 -57 -28 -222 -55 -336 -55 -107 0 -209 35 -317 108 -213 145 -399
  367 -793 952 -419 621 -507 720 -749 841 -107 53 -245 96 -386 120 -101 18
  -148 20 -295 16 -256 -8 -407 -48 -546 -146 -158 -111 -204 -263 -140 -456
  153 -454 730 -927 1506 -1235 133 -53 220 -82 641 -214 471 -147 573 -317 341
  -567 -77 -83 -323 -288 -407 -338 -145 -88 -367 -138 -430 -97 -20 13 -25 24
  -25 59 0 157 -114 271 -296 296 -124 18 -247 -17 -331 -93 -56 -50 -104 -144
  -110 -215 -11 -118 37 -163 246 -232 245 -81 305 -130 331 -272 12 -59 0 -172
  -26 -250 -28 -84 -103 -110 -232 -83 -146 31 -358 133 -577 277 -298 195 -488
  352 -805 664 -252 248 -301 285 -438 331 -429 144 -917 -208 -1068 -771 -32
  -122 -44 -361 -25 -496 86 -582 546 -963 1306 -1081 112 -17 186 -22 370 -22
  311 -1 439 21 725 122 213 76 308 96 460 96 157 1 194 -8 256 -66 72 -66 103
  -172 105 -357 2 -185 -24 -205 -818 -608 -232 -117 -457 -227 -500 -243 -200
  -73 -436 -108 -863 -130 -495 -26 -753 -109 -933 -299 -121 -129 -172 -293
  -148 -480 25 -202 134 -446 278 -626 282 -352 607 -467 975 -345 155 52 331
  156 523 309 130 104 611 547 890 821 259 254 289 276 413 301 42 8 109 10 195
  6 222 -9 355 -66 502 -212 122 -122 181 -236 211 -406 20 -113 13 -250 -14
  -312 -46 -102 -180 -256 -567 -647 -464 -469 -552 -567 -669 -738 -129 -190
  -196 -373 -196 -538 0 -72 33 -193 75 -273 131 -250 516 -513 827 -567 409
  -70 694 228 831 871 51 235 70 399 92 772 21 361 44 483 122 643 26 53 58 96
  108 146 110 111 224 154 410 154 143 0 259 -21 515 -95 124 -35 310 -85 414
  -110 104 -25 203 -52 221 -59 66 -28 101 -159 75 -289 -6 -34 -72 -244 -145
  -467 -183 -558 -225 -730 -247 -1026 -11 -146 -10 -170 6 -245 69 -323 268
  -550 528 -603 95 -20 136 -20 230 -2 164 32 282 98 424 240 155 155 270 348
  316 528 17 67 19 102 16 192 -7 148 -31 219 -181 521 -65 132 -146 305 -179
  385 -33 80 -100 232 -150 338 -98 212 -106 246 -69 306 43 69 116 114 294 180
  222 83 482 130 681 124 115 -3 138 -7 188 -30 82 -38 91 -56 100 -212 22 -387
  164 -548 580 -655 316 -82 485 -57 626 93 99 105 142 226 149 426 9 238 -33
  393 -133 496 -74 75 -130 110 -345 210 -218 102 -261 127 -326 187 -108 100
  -116 210 -21 291 149 128 551 227 985 243 l172 6 68 -33 c53 -26 93 -58 183
  -149 147 -147 195 -212 609 -812 145 -211 209 -283 294 -334 443 -259 1279
  -120 1637 272 119 131 160 225 160 372 0 532 -788 1299 -1467 1427 -142 27
  -284 21 -428 -17 -501 -131 -860 48 -1234 616 l-73 110 4 75 c4 96 38 168 120
  256 71 76 149 118 217 118 36 0 60 -8 106 -37 235 -144 594 -122 783 48 118
  106 174 256 147 391 -23 108 -76 206 -159 289 -118 120 -257 182 -426 192
  -174 10 -292 -40 -371 -159 -72 -110 -117 -130 -197 -89 -114 58 -292 327
  -321 485 -15 80 -14 121 4 191 47 181 221 342 574 530 188 101 254 125 337
  125 36 0 86 -5 112 -11 73 -18 212 -86 377 -186 181 -110 309 -174 411 -209
  321 -108 631 -54 989 171 395 248 598 518 599 795 1 150 -48 280 -153 413
  -215 270 -647 469 -1026 471 -238 1 -483 -95 -819 -319 -236 -157 -357 -252
  -847 -667 -353 -299 -509 -420 -611 -472 -106 -55 -169 -46 -247 34 -110 113
  -182 327 -185 545 -2 173 38 269 122 296 81 26 370 152 527 231 345 173 416
  305 307 576 -23 56 -62 135 -88 175 -173 268 -485 385 -719 271 -62 -31 -152
  -119 -184 -181 -36 -71 -61 -183 -66 -296 -6 -124 -14 -144 -82 -208 -134
  -126 -396 -215 -664 -226 -218 -9 -332 22 -448 124 -142 124 -272 372 -316
  606 -19 100 -19 266 -1 337 8 30 59 181 114 335 168 471 215 676 215 930 0
  169 -16 265 -65 382 -81 197 -214 326 -386 377 -70 20 -210 27 -292 15z"/>
  </g>
  </svg>
  `;
}

function resetMap(url) {
  fetch('chronic-map/'+url+'.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(geojson) {
    addMarkers(geojson);
    let stringMonth = url.split('-')
    document.getElementById('month').innerHTML = 'Displaying data from '+monthNames[stringMonth[1]]+' '+stringMonth[0];
  });
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyeDIzMDAiLCJhIjoiY2s2YjJkanU0MDFxdjNkcW0yOHM4YnNzbCJ9.bZat5rmK6nS1k8uAZXX2vA';
var map = new mapboxgl.Map({
  container: 'map',
  zoom: 6,
  center: [-119.29007140322268, 35.96972352218545],
  style: 'mapbox://styles/aarx2300/ck6b4jm530ho31iqsd8391sps'
});

let url = '2019-3';
map.on('load', function() {
  resetMap(url);
});

let sizeRanges = [100,1000,5000,10000,50000,100000,500000,1000000,2000000,5000000]
let colorRanges = [1,3,6,12,24,48,72,96];
let colorValues = ['607D8B','546E7A','455A64','000000','FF7043','FF5722','E64A19','BF360C'];
let currentMarkers = [];

function addMarkers(geojson) {
  // first remove all markers
  currentMarkers.forEach( (marker) => {
    marker.remove();
  })
  geojson.features.forEach(function(marker) {
    if(marker.geometry) {
      let fillColor = '000000';
      var el = document.createElement('div');
      let startWidth = 24;
      let startHeight = 26;
      let markerSizeMultiple = 1;
      sizeRanges.forEach( (size, index) => {
        if(marker.properties.POPULATION > size) {
          markerSizeMultiple = index + 1;
        }
      })
      let colorIndex = 0;
      colorRanges.forEach( (dirtiness, index) => {
        if(marker.properties.dirtyMonths >= dirtiness) {
          colorIndex = index;
        }
      })
      let colorValue = colorValues[colorIndex];
      // console.log(marker.properties.dirtyMonths)
      let width = markerSizeMultiple * startWidth;
      let height = markerSizeMultiple * startHeight;

      el.innerHTML = getMarkerHTML(colorValue, width, height);
      el.className = 'marker';

      let aMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${marker.properties.WATER_SYSTEM_NAME}</h3>
          <p>Analyte: ${marker.properties.ANALYTE_NAME}</p>
          <p>Population: ${parseInt(marker.properties.POPULATION).toLocaleString()}</p>
          <p>Continued for ${marker.properties.dirtyMonths} months</p>
          <p><a href="/system.html?id=${marker.properties.WATER_SYSTEM_NUMBER}" target="_blank">more info</a></p>`))
        .addTo(map);


      currentMarkers.push(aMarker);
    }
  });
}
