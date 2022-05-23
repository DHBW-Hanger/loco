let userInput;
const searchUrl = 'https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&formatversion=2&origin=*&srlimit=20&srsearch=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=';
let contentUrl2 = '&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*';


function setup () {
  userInput = 'Friedrichshafen';
  searchWiki();
  contentWiki();

  async function searchWiki () {
    const url = searchUrl + userInput;
    console.log(url);
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then(response => response.json())
        .then(json => {
          console.log(json);
          console.log(json['query']['search'][0]);
        })
        .catch(error => {
          console.log(error.message);
        });
  }

  async function contentWiki () {
    const url = contentUrl + userInput + contentUrl2;
    console.log(url);
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then(response => response.json())
        .then(json => {
          console.log(json);
          console.log(json['query']['pages'][0]['revisions'][0]['content']);
        })
        .catch(error => {
          console.log(error.message);
        });
  }
}

export default setup;
