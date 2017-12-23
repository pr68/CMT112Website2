document.getElementById('but').addEventListener('click', wikiImgFunc);



var processImgResponse = function(data) {
  console.log(data.query.pages[0].original.source);
  document.getElementById('wikiimg').src = data.query.pages[0].original.source;
}

function wikiImgFunc() {


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

  var query = document.getElementById('selector').value;

  var parameters = {
    format: 'json',
    formatversion: 2,
    action: 'query',
    titles: query,
    redirects: '',
    callback: 'processImgResponse'
  }

  var imgparams = {
    prop: 'pageimages',
    piprop: 'original'
  }

  var base_url = 'https://en.wikipedia.org/w/api.php'
  var query_url = base_url + '?' + encodeParameters(parameters) + '&' + encodeParameters(imgparams)

  console.log(query_url);

  var script = document.createElement('script')
  script.src = query_url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
