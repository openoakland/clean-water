export function getCoords(points, color) {
  let blueCenter = { lng: points[0], lat: points[1] };
  //console.log(blueCenter)
  var blueCoords = [
    [
      [
        blueCenter.lng,
        blueCenter.lat
      ],
      [
        blueCenter.lng,
        blueCenter.lat - 0.005
      ],
      [
        blueCenter.lng + 0.0082,
        blueCenter.lat - 0.005
      ],
      [
        blueCenter.lng + 0.0082,
        blueCenter.lat
      ],
      [
        blueCenter.lng,
        blueCenter.lat
      ]
    ]
  ]
  return blueCoords;
}