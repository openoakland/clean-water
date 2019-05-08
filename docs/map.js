let waterSystemId = window.location.search.replace('?id=','');

fetch('data/loc-'+waterSystemId+'.json')
.then(function(response) {
  return response.json();
})
.then(function(locationData) {
  
  let markerImage = 'https://i.imgur.com/MK4NUzI.png';

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25oYW5zIiwiYSI6ImNqNGs4cms1ZzBocXkyd3FzZGs3a3VtamYifQ.HQjFfVzwwxwCmGr2nvnvSA';
  var map = new mapboxgl.Map({
    container: 'map',
    zoom: 9,
    center: locationData.geometry.coordinates,
    style: 'mapbox://styles/mapbox/streets-v11'
  });
  
  map.on('load', function() {
    map.loadImage(markerImage, function(error, image) {
      if (error) throw error;
      map.addImage('starMarker', image);
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": locationData.geometry.coordinates
              }
            }]
          }
        },
        "layout": {
          "icon-image": "starMarker",
          "icon-size": 0.5
        }
      });
    });
  });
});
