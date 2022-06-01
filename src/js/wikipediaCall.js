const userInput = 'Friedrichshafen';


async function wikiCall(longitude = 9.44376, latitude = 47.667223) {
  await reverseGeocoding(longitude, latitude);
  // searchWiki(userInput);
  // contentWiki(userInput);
  await getImages(userInput);

  /**
   * gibt Adresse auf der Konsole aus
   */
  async function reverseGeocoding(lon, lat) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
    const data = await response.json();
    console.log(data['display_name']);
  }

  function searchWiki(userInput) {
    const url = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&formatversion=2&origin=*&srlimit=20&srsearch=${userInput}`;
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

  function contentWiki(userInput) {
    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${userInput}&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*`;
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

  async function getImages(location) {
    let imageNames;
    let apiurls;
    let contentImageApi;
    let content = [];
    // get names of images
    imageNames = await imageWikiUrls(location);
    // create urls for image api Call
    apiurls = await createImageAPIUrls(imageNames);
    // get image urls
    for (let i = 0; i < apiurls.length; i++) {
      contentImageApi = await getImageUrl(apiurls[i]);
      if ('imageinfo' in contentImageApi['query']['pages'][0]) {
        if ('url' in contentImageApi['query']['pages'][0]['imageinfo'][0]) {
          content.push(contentImageApi['query']['pages'][0]['imageinfo'][0]['url']);
        }
      } else {
        content.push("");
      }
    }
    console.log(content)
  }

  async function imageWikiUrls(userInput) {
    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${userInput}&format=json&prop=images&origin=*`;
    let content;
    await fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((json) => content = json)
        .catch((error) => {
          console.log(error.message);
        });
    return content;
  }

  async function createImageAPIUrls(data) {
    const pageId = Object.keys(data.query.pages)[0];
    const images = data.query.pages[pageId]['images'];
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      let imagename = images[i]['title'];
      imagename = imagename.replace('Datei', 'File');
      urls[i] = `https://de.wikipedia.org/w/api.php?action=query&titles=${imagename}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json&formatversion=2&origin=*`;
    }
    return urls;
  }

  async function getImageUrl(urls) {
    let content;
    await fetch(urls)
        .then((response) => response.json())
        .then((json) => content = json)
        .catch((response) => response.json());
    return content;
  }
}

export default wikiCall();
