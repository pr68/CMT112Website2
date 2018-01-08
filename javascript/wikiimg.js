document.getElementById('but').addEventListener('click', wikiImgFunc);


//function that takes the url returned and inserts the image onto the page
var processImgResponse = function(data) {
  console.log(data.query.pages[0].original.source);
  document.getElementById('wikiimg').src = data.query.pages[0].original.source;
  document.getElementById('wikiimg').style.visibility = 'visible';
  document.getElementById('wikiimg').title = document.getElementById('selector').value;
}
//wikipedia api code adapter from Martin Chorley
function wikiImgFunc() {

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
//finds the chosen lake/fell
  var query = document.getElementById('selector').value;
//generic parameters
  var parameters = {
    format: 'json',
    formatversion: 2,
    action: 'query',
    titles: query,
    redirects: '',
    callback: 'processImgResponse'
  }
//image parameters (piprop original returns the main image)
  var imgparams = {
    prop: 'pageimages',
    piprop: 'original'
  }
//builds the url
  var base_url = 'https://en.wikipedia.org/w/api.php'
  var query_url = base_url + '?' + encodeParameters(parameters) + '&' + encodeParameters(imgparams)

  console.log(query_url);
//adds the script to the page
  var script = document.createElement('script')
  script.src = query_url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
