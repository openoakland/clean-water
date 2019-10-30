import { randomString } from './random.js';
import { getCoords } from './column-coords.js';


export function formatData(json, map, color) {
  let dataObj = {
    "features": [],
    "type": "FeatureCollection"
  };

  let recordsFound = 0;
  json.forEach(function(result) {
    recordsFound++;
    let coords = getCoords(result.geometry.coordinates);
    if(result.properties.RESULT.trim() != '') {
      result.properties.proportion_mcl = parseFloat(result.properties.RESULT) / parseFloat(result.properties.MCL_VALUE)
    }
    let featureBlue = buildFeatureMCL(result,coords,color)
    dataObj.features.push(featureBlue);

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.innerHTML = `${result.properties['ANALYTE_NAME']}`;

    if(result.properties.RESULT.trim() != '' && result.properties.MCL_VALUE.trim() != '') {
      el.innerHTML = `${result.properties['ANALYTE_NAME']} ${parseInt(result.properties.proportion_mcl * 100)}% MCL`;
    }
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(result.geometry.coordinates)
    .addTo(map);    

  });
  
  
  map.addLayer({
    'id': 'room-extrusion',
    'type': 'fill-extrusion',
    'source': {
      // Geojson Data source used in vector tiles, documented at
      // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
      'type': 'geojson',
      'data': dataObj
    },
    'paint': {
      // See the Mapbox Style Spec for details on property functions
      // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
      'fill-extrusion-color': {
      // Get the fill-extrusion-color from the source 'color' property.
      'property': 'color',
      'type': 'identity'
    },
      'fill-extrusion-height': {
      // Get fill-extrusion-height from the source 'height' property.
      'property': 'height',
      'type': 'identity'
    },
      'fill-extrusion-base': {
      // Get fill-extrusion-base from the source 'base_height' property.
      'property': 'base_height',
      'type': 'identity'
    },
      // Make extrusions slightly opaque for see through indoor walls.
      'fill-extrusion-opacity': 0.7
    }
  });
}

function buildFeatureMCL(item,coords,color) {
  let calculatedHeight = parseFloat(5000 * item.properties.proportion_mcl);
  if(item.properties.height) {
    calculatedHeight = item.properties.height;
  }
  return {
    "type": "Feature",
    "properties": {
      "level": 1,
      "height": calculatedHeight,
      "base_height": 0,
      "color": color
    },
    "geometry": {
      "coordinates": coords,
      "type": "Polygon"
    },
    "id": randomString()
  };
}