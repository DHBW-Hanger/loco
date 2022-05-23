let userInput;
const searchUrl = 'https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&formatversion=2&origin=*&srlimit=20&srsearch=';
const contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=';
const contentUrl2 = '&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*';

/**
 *
 * @param longitude
 * @param latitude
 */
function wikiCall(longitude = 9.44376, latitude = 47.667223) {

  console.log('Test');
  reverseGeocoding(longitude, latitude);

  /**
   * gibt Adresse auf der Konsole aus
   * @param lon = longitude
   * @param lat = latitude
   */
  async function reverseGeocoding(lon, lat) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
    const data = await response.json();
    // display_name ist ein key der json file
    console.log(data.display_name);
  }

  userInput = 'Friedrichshafen';
  searchWiki();
  contentWiki();
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
}

export default wikiCall();
