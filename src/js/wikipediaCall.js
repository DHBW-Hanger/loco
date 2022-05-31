let userInput;
const searchUrl = 'https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&formatversion=2&origin=*&srlimit=20&srsearch=';
const contentUrl = 'https://de.wikipedia.org/w/api.php?action=query&titles=';
const contentUrl2 = '&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*';
const imageUrl = 'https://de.wikipedia.org/w/api.php?action=query&titles=';
const imageUrl2 = '&format=json&prop=images&origin=*';

/**
 *
 */
function wikiCall(longitude = 9.44376, latitude = 47.667223) {
  reverseGeocoding(longitude, latitude);
  userInput = 'Friedrichshafen';
  //searchWiki();
  contentWiki();

  /**
   * gibt Adresse auf der Konsole aus
   */
  async function reverseGeocoding(lon, lat) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
    const data = await response.json();
    // display_name ist ein key der json file
    console.log(data.display_name);
  }

  /**
   *
   */
  function searchWiki() {
    const url = searchUrl + userInput;
    console.log(url);
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          console.log(json['query']['search'][0]);
        })
        .catch((error) => {
          console.log(error.message);
        });
  }

  /**
   *
   */
  function contentWiki() {
    const url = contentUrl + userInput + contentUrl2;
    console.log(url);
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          console.log(json['query']['pages'][0]['revisions'][0]['content']);
        })
        .catch((error) => {
          console.log(error.message);
        });
  }

  imageWiki()

  function imageWiki() {
    const url = imageUrl + userInput + imageUrl2;
    console.log(url);
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          getImages(json);

        })
        .catch((error) => {
          console.log(error.message);
        });
  }

  // get Images in wiki
  function getImages(data) {
    let pageId = Object.keys(data.query.pages)[0];
    let images = data.query.pages[pageId]['images'];
    console.log(images);
    let urls = [];
    let imageurlnew = 'https://de.wikipedia.org/wiki/';
    for (let i = 0; i < images.length; i++) {
      let imagename = images[i]['title'];
      urls[i] = imageurlnew + userInput + '#/media/' + imagename;
      urls[i] = urls[i].split(' ').join('_');
    }
    urls.forEach(function(element, index){
      console.log(element, index);
    });
  }
}

export default wikiCall();
