const userInput = 'Friedrichshafen';

/**
 * wikipedia Api Call for everything
 *
 * @param {float} longitude
 * @param {float} latitude
 *
 */
async function wikiCall(longitude = 9.44376, latitude = 47.667223) {
  await reverseGeocoding(longitude, latitude);
  // searchWiki(userInput);
  // contentWiki(userInput);
  await getImages(userInput);

  /**
   * prints address on console
   *
   * @param {float} lon
   * @param {float} lat
   * @return {Promise<void>}
   */
  async function reverseGeocoding(lon, lat) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
    const data = await response.json();
    console.log(data['display_name']);
  }

  /**
   * searches wiki with user input
   *
   * @param {string} userInput
   */
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

  /**
   * prints the content of the wiki page
   *
   * @param {string} userInput
   */
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

  /**
   * prints urls of images on console
   *
   * @param {string} location
   * @return nothing so far
   */
  async function getImages(location) {
    // get names of images
    const imageNames = await imageWikiUrls(location);
    // create urls for image api Call
    const apiurls = await createImageAPIUrls(imageNames);
    let contentImageApi;
    const content = [];

    // get image urls
    for (let i = 0; i < apiurls.length; i++) {
      contentImageApi = await getImageUrl(apiurls[i]);
      if ('imageinfo' in contentImageApi['query']['pages'][0]) {
        if ('url' in contentImageApi['query']['pages'][0]['imageinfo'][0]) {
          content.push(contentImageApi['query']['pages'][0]['imageinfo'][0]['url']);
        }
      } else {
        content.push('');
      }
    }
    console.log(content);
  }

  /**
   * gets name of 30 images (imlimit=30)
   * @param {String} userInput
   * @return {Promise<*>}
   */
  async function imageWikiUrls(userInput) {
    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${userInput}&format=json&prop=images&imlimit=30&origin=*`;
    /*
    let url = "https://de.wikipedia.org/w/api.php?"
    let params = {
      action: "query",
      titles: userInput,
      format: "json",
      prop: "images",
      imlimit: "30",
      origin: "*"
    }
    Object.keys(params).forEach((key) => {
      url += "&" + key + "=" + params[key];
    });
    */
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

  /**
   * creates the url apicalls for the imagenames and only includes the .jpg files
   * @param {json} data
   * @return {Promise<*[]>}
   */
  async function createImageAPIUrls(data) {
    const pageId = Object.keys(data.query.pages)[0];
    const images = data.query.pages[pageId]['images'];
    const urls = [];
    let count = 0;
    for (let i = 0; i < images.length; i++) {
      if ((images[i]['title']).includes('.jpg')) {
        let imagename = images[i]['title'];
        imagename = imagename.replace('Datei', 'File');
        urls[count] = `https://de.wikipedia.org/w/api.php?action=query&titles=${imagename}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json&formatversion=2&origin=*`;
        count++;
      }
    }
    return urls;
  }

  /**
   * fetches the url and returns the content
   * @param {string} url
   * @return {Promise<*>}
   */
  async function getImageUrl(url) {
    let content;
    await fetch(url)
        .then((response) => response.json())
        .then((json) => content = json)
        .catch((response) => response.json());
    return content;
  }
}

export default wikiCall();
