# Mapbox map with 3D columns Custom Element

Using extrusions to add vertical columns to a map

## Example

<img src="3D-bars-map.png" />

## How to use

### Put the custom element HTML tag in you page:

```
  <cfa-oak-map-columns color="" center="" key=""></cfa-oak-map-columns>
```

The element takes 3 string attributes:

- color: color for the columns (defaults to red)
- center: lat,lon value
- key: your mapbox account key

### Include the javascript 

The javascript code for the custom element should be included in your client side package or referenced with a script tag:

```
<script type="module" src="index.js"></script>
```

The mapbox JS and CSS dependencies are not included in this web component so must also be included separately:

```
  <script src='https://api.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css' rel='stylesheet' />
```

### Apply your data

Your json dataset should include be an array of objects each containing a value for the height of each column and a geometry object with the lat, lon of the point where the column should be applied.

Example:

```
[
  {
    "height": 100
    "geometry": {
      "type": "Point",
      "coordinates": [
        -120.99008538506384,
        37.79358517235438
      ]
    }
  }
]
```

You can apply this to the custom element by locating it in the DOM and setting the json as an attribute:

```
document.querySelector('cfa-oak-map-columns').json = myDataSet;
```