if (document.getElementById('but') !== null) { //checks whether the page has a button, and adds an event listener if it does
  document.getElementById('but').addEventListener('click', wikiTxtFunc);
} else {
  wikiTxtFunc();
}


//function that adds the text content to the html
var processResponse = function(data) {
  var txt = data.query.pages[0].extract;
  txtStripped = txt.replace(/<(?:.|\n)*?>/gm, '');
  try{
    document.getElementById('wikitxt').textContent = txtStripped;
  }
  catch(err) {
    document.getElementById('wikitxt').textContent = err.message;
  }
}
//wikipedia api code adapted from Martin Chorley
function wikiTxtFunc() {
//joins the parameters together
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
//finds the chosen lake/fell or for location page returns Lake District
if (document.getElementById('selector') !== null) {
  var query = document.getElementById('selector').value;
} else {
  var query = 'Lake District';
}
//generic parameters
var parameters = {
  format: 'json',
  formatversion: 2, /*returns as an array*/
  action: 'query',
  titles: query,
  redirects: '',
  callback: 'processResponse'
}
//parameters for the text content
var txtparams = {
  prop: 'extracts',
  exintro: ''
}
//builds the url
var base_url = 'https://en.wikipedia.org/w/api.php'
var query_url = base_url + '?' + encodeParameters(parameters) + '&' + encodeParameters(txtparams);

console.log(query_url);
//adds the script to the page
var script = document.createElement('script')
script.src = query_url;
document.getElementsByTagName('head')[0].appendChild(script);
}
