
module.exports = (function () {

  var module = {}
  var map
  var markers = []

  var goneIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-check.svg',
    iconSize: [25, 25],
    shadowSize: [50, 64],
    iconAnchor: [12, 12],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
  })

  /**
   * Initialize the map
   */
  module.initMap = function () {
    const LATNG_PARIS = [48.866667, 2.333333]
    map = L.map('map').setView(LATNG_PARIS, 5)

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map)
    map.invalidateSize();
    map.getSize();
  }

  module.createMarker = function (latlng, done) {
    if (done) {
      markers.push(L.marker(latlng, { icon: goneIcon }, 7).addTo(map))
    } else {
      markers.push(L.marker(latlng, 7).addTo(map))
    }
    map.panTo(latlng)
  }

  module.deleteMarker = function (latlng) {
    markers.filter(function (el) {
      return el._latlng.lat == latlng.lat &&
        el._latlng.lng == latlng.lng
    }).forEach(function (el) {
      map.removeLayer(el)
    })
  }

  module.centerElement = function (latlng) {
    map.panTo(latlng);
  }

  return module
})()
