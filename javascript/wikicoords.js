if (document.getElementById('but') !== null) {//adds event listener if there is a button
  document.getElementById('but').addEventListener('click', wikiCoordFunc);
} else {
  wikiCoordFunc();
}
//initalises the map (from the leaflet website)
var mymap = L.map('locmap', {
  center: [54.5, -3.166667],
  zoom: 12
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoicHI2OCIsImEiOiJjamIyMXpkZXc4dDE5MndxZW44czVhaXBkIn0.0sfaLuXhICPEABMRJjc2Pw'
}).addTo(mymap);


//uses the returned coords to set the map to that point and bring up a marker
var processCoordResponse = function(data) {
  var lat = data.query.pages[0].coordinates[0].lat;
  var lon = data.query.pages[0].coordinates[0].lon;
  mymap.setView([lat, lon], 12);
  var marker = L.marker([lat, lon]).addTo(mymap);
  marker.bindPopup(document.getElementById('selector').value).openPopup();
  document.getElementById('locmap').style.visibility = 'visible';
}
//wikipedia api adapted from Martin Chorley
function wikiCoordFunc() {
//joins up parameters
var encodeParameters = function(params) {
  var strArray = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var paramString = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      strArray.push(paramString);
    }
  }
  return strArray.join('&');
}
//finds the chosen lake/fell, else uses Lake District on location page
if (document.getElementById('selector') !== null) {
  var query = document.getElementById('selector').value;
} else {
  var query = 'Lake District';
}
//generic parameters
var parameters = {
  format: 'json',
  formatversion: 2,
  action: 'query',
  titles: query,
  redirects: '',
  callback: 'processCoordResponse'
}
//coord parameters
var coordparams = {
  prop: 'coordinates'
}
//builds the url
var base_url = 'https://en.wikipedia.org/w/api.php'
var query_url = base_url + '?' + encodeParameters(parameters) + '&' + encodeParameters(coordparams);

console.log(query_url);
//adds script to page
var script = document.createElement('script')
script.src = query_url;
document.getElementsByTagName('head')[0].appendChild(script);
}
