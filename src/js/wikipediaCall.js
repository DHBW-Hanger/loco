const userInput = 'Friedrichshafen';

/**
 * wikipedia Api Call for everything
 *
 * @param {float} longitude
 * @param {float} latitude
 *
 */
async function wikiCall(longitude = 9.44376, latitude = 47.667223) {
  let location = await reverseGeocoding(longitude, latitude);
  console.log(location);

  // townInfo(location);
  // searchWiki(userInput);
  contentWiki(userInput);
  // await getImages(userInput);
  /**
   * location ist leer, bis location mit userInput verbunden ist.
   * @param {string} location
   * @return {string} nothing so far
   */
  async function townInfo(location){
    const dict = {};
    location = location.toString()
    const country = location.split(' ').pop();
    /*
    dict['country'] = country;
    */
    dict['country'] = 'test';
    /*
    const url = `https://query.wikidata.org/sparql?query=%0ASELECT%20%3Ftown%20%3FtownLabel%20%3Fcountry%20%0AWHERE%20%0A%7B%0A%20%20%3Ftown%20%3Flabel%20%22${location}%22%40de.%0A%20%20%3Ftown%20wdt%3AP17%20%20%3Fcountry.%0A%7D`
    const content = await getContent(url);
    // Deutschland
    if conent.results.bindings[0].country.value.contains('Q183') {
    }

     */

    if ("Deutschland" in dict)
    {
      const url = `https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Ftown%20%3FtownLabel%20%3Farea%20%3Fpopulation%20%3Fcountry%20%3Fpostcode%20WHERE%20%7B%0A%20%20%3Ftown%20%3Flabel%20%22${userInput}%22%40de.%0A%20%20%3Ftown%20wdt%3AP2046%20%3Farea.%0A%20%20%3Ftown%20wdt%3AP1082%20%3Fpopulation.%0A%20%20%3Ftown%20wdt%3AP17%20%3Fcountry.%0A%20%20%3Ftown%20wdt%3AP281%20%3Fpostcode%0A%7D`;
      const content = await getContent(url);
      console.log(content);
      dict['area'] = content.results.bindings[0].area.value;
      dict['population'] = content.results.bindings[0].population.value;
      dict['postcode'] = content.results.bindings[0].postcode.value;
    }else{
      const url = `https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Ftown%20%3FtownLabel%20%3Farea%20%3Fpopulation%20%3Fcountry%20%3Fpostcode%20WHERE%20%7B%0A%20%20%3Ftown%20%3Flabel%20%22${userInput}%22%40de.%0A%20%20%3Ftown%20wdt%3AP2046%20%3Farea.%0A%20%20%3Ftown%20wdt%3AP1082%20%3Fpopulation.%0A%20%20%3Ftown%20wdt%3AP17%20%3Fcountry.%0A%20%20%3Ftown%20wdt%3AP281%20%3Fpostcode%0A%7D`;
      const content = await getContent(url);
      console.log(content);

      dict['area'] = content.results.bindings[0].area.value;
      dict['population'] = content.results.bindings[0].population.value;
    }
    console.log(dict);
  }

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
    return(data['display_name']);
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
    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${userInput}&prop=revisions&rvprop=content&format=json&formatversion=2&rvsection=0&rvlimit=1&origin=*`;
    console.log(url);
    let content;
    fetch(
        url,
        {
          method: 'GET',
        },
    )
        .then((response) => response.json())
        .then((json) => {
          content = json['query']['pages'][0]['revisions'][0]['content'];
          //console.log(content);
          content = content.toString();
          let info = content.split("'''").pop();
          info = info.replace((/[{()]/g),'[');
          info = "adsff[asdjklö|";
          console.log(info);
          info = info.replace((/[{()]/g)*(/[|]/g), '');


          //info = info.replace(/[\[\]']+/g, '[');

          console.log(info);
        })
        .catch((error) => {
          console.log(error.message);
        });
    console.log(content)
  }

  /**
   * prints urls of images on console
   *
   * @param {string} location
   * @return {string} nothing so far
   */
  async function getImages(location) {
    // get names of images at location
    const locationurl = `https://de.wikipedia.org/w/api.php?action=query&titles=${location}&format=json&prop=images&imlimit=30&origin=*`;
    const imageNames = await getContent(locationurl);

    // create urls for image api Call
    const apiurls = await createImageAPIUrls(imageNames);

    let contentImageApi;
    const content = [];
    // get image urls
    for (let i = 0; i < apiurls.length; i++) {
      contentImageApi = await getContent(apiurls[i]);
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
   * slower than getContent(url)
   * fetches the url and returns the content
   * @param {string} url
   * @return {json} content
   */
  async function getContent2(url) {
    let content;
    await fetch(url)
        .then((response) => response.json())
        .then((json) => content = json)
        .catch((response) => response.json());
    return content;
  }
  /**
   * fetches the url and returns the content
   * @param {string} url
   * @return {json} content
   */
  async function getContent(url){
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
}

export default wikiCall();
