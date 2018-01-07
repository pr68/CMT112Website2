if (document.getElementById('but') !== null) {
  document.getElementById('but').addEventListener('click', wikiTxtFunc);
} else {
  wikiTxtFunc();
}



var processResponse = function(data) {
  document.getElementById('arthead').innerHTML = document.getElementById('selector').value;
  var txt = data.query.pages[0].extract;
  txtStripped = txt.replace(/<(?:.|\n)*?>/gm, '');
  try{
    document.getElementById('wikitxt').textContent = txtStripped;
  }
  catch(err) {
    document.getElementById('wikitxt').textContent = err.message;
  }
}

function wikiTxtFunc() {

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

if (document.getElementById('selector') !== null) {
  var query = document.getElementById('selector').value;
} else {
  var query = 'Lake District';
}

var parameters = {
  format: 'json',
  formatversion: 2,
  action: 'query',
  titles: query,
  redirects: '',
  callback: 'processResponse'
}

var txtparams = {
  prop: 'extracts',
  exintro: ''
}

var base_url = 'https://en.wikipedia.org/w/api.php'
var query_url = base_url + '?' + encodeParameters(parameters) + '&' + encodeParameters(txtparams);

console.log(query_url);

var script = document.createElement('script')
script.src = query_url;
document.getElementsByTagName('head')[0].appendChild(script);
}
