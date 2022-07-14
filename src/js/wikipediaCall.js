import {indexOf} from 'leaflet/src/core/Util';

/**
 * function returns infos about the input or marker location
 *
 * @param {string}input
 * @param {{}}reverse
 * @return {Promise<{}>}
 */
export async function handleSearch(input, reverse = {}) {
  const result = {};
  let completeAddress = '';
  let latitude;
  let longitude;
  let townInfoPart1;
  let townInfoPart2;
  let postcode;

  // check if function is called via marker
  if (Object.keys(reverse).length !== 0) {
    // get infos from reverseGeocoding
    let infos = await reverseGeocoding(reverse['lng'], reverse['lat']);
    // get stadt from jsonfile infos
    infos = getTown(infos, input);
    // set input to stadt
    input = infos['address']['stadt'];
    completeAddress = infos['display_name'];
    postcode = infos['address']['postcode'];
    latitude = reverse['lat'];
    longitude = reverse['lng'];
  }

  // check if input (stadt) is not empty
  if (input !== '') {

    // cityInfos from nominatim
    const cityInfos = await getCityInfosNominatim(input);

    // if input is valid
    if (cityInfos !== undefined) {

      // get stadt
      const stadt = cityInfos['address']['stadt'];

      // get townInfoPart1 and townInfoPart2 from wikipedia for townDescription
      townInfoPart1 = await townInfoWiki(stadt);
      if (typeof townInfoPart1 === 'string') {
        let laenge = townInfoPart1.length;
        if (laenge > 150) {
          laenge = townInfoPart1.indexOf(' ', 150);
          // if laenge is shorter than towninfopart1 divide towninfopart1 in two parts
          if (laenge < townInfoPart1.length && laenge > 0) {
            townInfoPart2 = townInfoPart1.substring(laenge + 1);
            townInfoPart1 = townInfoPart1.substring(0, laenge);
          }
        }
      } else {
        townInfoPart1 = '';
      }

      // get population from wikidata
      const cityInfosWikidata = await getCityInfosWikidata(stadt, cityInfos['address']['country']);
      const populationData = getPopulation(cityInfosWikidata)

      // get postcode
      if (postcode == null) postcode = cityInfos['address']['postcode'];
      if (postcode == null) postcode = cityInfosWikidata['postalCode'];
      if (postcode == null && stadt !== cityInfos['address']['town'] && cityInfos['address']['town'] !== null) {
        const postcode2 = await getCityInfosNominatim(cityInfos['address']['town']);
        postcode = postcode2['address']['postcode'];
      }

      // get image from wikipedia
      const imageUrl = await getImages(stadt);

      // if latitude and longitude are not set, get them from cityInfos
      if (latitude === undefined) latitude = (Number(cityInfos['boundingbox'][0]) + Number(cityInfos['boundingbox'][1])) / 2;
      if (longitude === undefined) longitude = (Number(cityInfos['boundingbox'][2]) + Number(cityInfos['boundingbox'][3])) / 2;


      // set states
      result.city = stadt;
      result.markedAddress = completeAddress;
      result.country = cityInfos['address']['country'];
      result.townDescription = townInfoPart1;
      result.townDescription2 = townInfoPart2;
      result.image = imageUrl;
      result.state = cityInfos['address']['state'];
      result.postCode = postcode;
      result.locationMarker = {lat: latitude, lng: longitude};
      result.population = populationData;
    }
  } else {
    console.log('invalid input');
  }
  return result;
}



/* eslint-enable */

const openWeatherMapKey = 'e12cd34ba9dc90e41910b20cdee02430';

/**
 * fetches the url and returns the content
 * @param {string} town - name of the town
 * @return {Promise<any>}
 */
export async function geocodeTown(town) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=1&appid=${openWeatherMapKey}`);
  const data = await response.json();
  return data;
}

/**
 * nominatim api gets address from longitude and latitude
 *
 * @param {float} lon
 * @param {float} lat
 * @return {Promise<void>}
 */
async function reverseGeocoding(lon, lat) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
  const data = await response.json();
  return data;
}

/**
 * nominatim api gets infos about the town from the input
 *
 * @param {string}input
 * @return {Promise<any>}
 */
async function getCityInfosNominatim(input) {
  let data = await getContent(`https://nominatim.openstreetmap.org/search?q=${input}&format=json&polygon=1&addressdetails=1`);
  data = getTown(data[0], input);
  return data;

}

/**
 * creates new key stadt and puts the town/village/suburb... in it
 * @param {*} data
 * @param {string} input
 * @return {*} data
 */
function getTown(data, input) {
  try {
    if (Object.keys(data).length !== 0) {
      if (data['address']['country'] === 'Vereinigte Staaten von Amerika') {
        data['address']['country'] = 'Vereinigte Staaten';
      }
      let stadt;
      switch (input) {
        case data['address']['town']:
          stadt = input;
          break;
        case data['address']['city']:
          stadt = input;
          break;
        case data['address']['village']:
          stadt = input;
          break;
        case data['address']['suburb']:
          stadt = input;
          break;
        case data['address']['city_district']:
          stadt = input;
          break;
        case data['address']['county']:
          stadt = input;
          break;
        default:
          if ('suburb' in data['address']) {
            stadt = data['address']['suburb'];
          } else if ('city_district' in data['address']) {
            stadt = data['address']['city_district'];
          } else if ('town' in data['address']) {
            stadt = data['address']['town'];
          } else if ('city' in data['address']) {
            stadt = data['address']['city'];
          } else if ('county' in data['address'] && !('town') in data['address']) {
            stadt = data['address']['county'];
          }
      }
      data['address']['stadt'] = stadt;
    }
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

/**
 * wikipedia/wikidata api gets infos about the town from the input
 * Internetlink: https://query.wikidata.org/#SELECT%20%3Fcity%20%3FcityLabel%20%3Fcountry%20%3FcountryLabel%20%3Fpopulation%0A%20%20%20%20WHERE%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%3Fcity%20rdfs%3Alabel%20%27Friedrichshafen%27%40de.%0A%20%20%20%20%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation.%0A%20%20%20%20%20%20%3Fcity%20wdt%3AP17%20%3Fcountry.%0A%20%20%20%20%20%20%3Fcity%20rdfs%3Alabel%20%3FcityLabel.%0A%20%20%20%20%20%20%3Fcountry%20rdfs%3Alabel%20%3FcountryLabel.%0A%20%20%20%20%20%20FILTER%28LANG%28%3FcityLabel%29%20%3D%20%22de%22%29.%0A%20%20%20%20%20%20FILTER%28LANG%28%3FcountryLabel%29%20%3D%20%22de%22%29.%0A%20%20%20%20%20%20FILTER%28CONTAINS%28%3FcountryLabel%2C%20%22Deutschland%22%29%29.%0A%20%20%20%20%7D
 * @param {string}town
 * @param {string}country
 * @return {Promise<*[]>}
 */
async function getCityInfosWikidata(town, country) {
  const info = [];
  let data = await getContent(`https://de.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${town}&rvsection=0&origin=*`);
  try {
    if (['pages'] in data['query']) {
      data = data['query']['pages'];
      const [id] = Object.keys(data);
      if (['*'] in data[id]['revisions'][0]) {
        data = data[id]['revisions'][0]['*'];
        // only parse Infobox
        let anfang = data.indexOf('{{Infobox');
        if (anfang !== -1) {
          let informationen;
          let position;
          let ende = data.indexOf('}}', anfang);
          data = data.substring(anfang, ende);

          // check if Einwohner exists in Infobox
          anfang = data.indexOf('Einwohner');
          if (anfang !== -1) {
            ende = data.indexOf('|', anfang);
            informationen = data.substring(anfang, ende);
            position = informationen.indexOf('=');
            if (indexOf(informationen) === 'Number') {
              if (position !== -1) informationen = informationen.substring(position + 1);
              info['population'] = informationen;
            }
          }
          // check if postalcode exists in Infobox
          anfang = data.indexOf('Postleitzahl');
          const anfang2 = data.indexOf('PLZ');
          if (anfang !== -1) {
            ende = data.indexOf('|', anfang);
            informationen = data.substring(anfang, ende);
            position = informationen.indexOf('=');
            if (position !== -1) informationen = informationen.substring(position + 1);
            info['postalCode'] = informationen;
          } else if (anfang2 !== -1) {
            ende = data.indexOf('|', anfang2);
            informationen = data.substring(anfang2, ende);
            position = informationen.indexOf('=');
            if (position !== -1) informationen = informationen.substring(position + 1);
            ende = informationen.indexOf('<');
            if (ende !== -1) informationen = informationen.substring(0, ende);
            info['postalCode'] = informationen;
          }
          info['all'] = data;
        }
      }
      // if population is not in wikipedia, get it from wikidata
      if (!('population' in info)) {
        /**
         *
         */
        class SPARQLQueryDispatcher {
          /**
           *
           * @param {string}endpoint
           */
          constructor(endpoint) {
            this.endpoint = endpoint;
          }

          /**
           *
           * @param {string}sparqlQuery
           * @return {Promise<any>}
           */
          query(sparqlQuery) {
            const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
            const headers = {'Accept': 'application/sparql-results+json'};
            return fetch(fullUrl, {headers}).then((body) => body.json());
          }
        }

        const endpointUrl = 'https://query.wikidata.org/sparql';
        const sparqlQuery = `SELECT ?city ?cityLabel ?country ?countryLabel ?population
    WHERE
    {
      ?city rdfs:label '${town}'@de.
      ?city wdt:P1082 ?population.
      ?city wdt:P17 ?country.
      ?city rdfs:label ?cityLabel.
      ?country rdfs:label ?countryLabel.
      FILTER(LANG(?cityLabel) = "de").
      FILTER(LANG(?countryLabel) = "de").
      FILTER(CONTAINS(?countryLabel, "${country}")).
    }`;
        const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
        const bevoelkerung = await queryDispatcher.query(sparqlQuery);
        const searchresults = bevoelkerung['results']['bindings'].length;
        info['population'] = bevoelkerung['results']['bindings'][0]['population'].value;
        for (let i = 0; i < searchresults; i++) {
          if (info['population'] > bevoelkerung['results']['bindings'][i]['population'].value) {
            info['population'] = bevoelkerung['results']['bindings'][i]['population'].value;
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return info;
}

/**
 * returns the first extract in wikipedia about the location and removes all html elements and brackets
 * since the pageid changes from every apicall, the first key in the dictionary data['query']['pages] is collected
 *
 * @param {string} location
 * @return {string} data
 */
async function townInfoWiki(location) {
  const url = `https://de.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${location}&format=json&origin=*`;
  let data = await getContent(url);
  try {
    data = data['query']['pages'];
    // gets first key from data
    const [id] = Object.keys(data);
    data = data[id]['extract'];
    data = data.replace(/<[^>]+>/g, '');
    // removes everything between square brackets, however some wikipedia articles look bad then.
    data = data.replace(/ *\[[^\]]*]/g, '');
    // removes everything between normal brackets.
    data = data.replace(/\(.*?\)/g, '');
    data = data.replace('  ', ' ');
    data = data.replace(' ,', ',');
  } catch (error) {
    console.log(error.message);
  }
  return data;
}


/**
 * calls wikipedia api for imagenames, then creates url of image
 *
 * @param {string} location
 * @return {string} urls of images
 */
async function getImages(location) {
  // get names of images at location
  const locationurl = `https://de.wikipedia.org/w/api.php?action=query&titles=${location}&format=json&prop=images&imlimit=10&origin=*`;
  const imageNames = await getContent(locationurl);

  // create urls for image api Call
  const apiurls = await createImageAPIUrls(imageNames);

  let contentImageApi;
  const content = [];
  // get image urls
  try {
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
    // if no image was found in wikipedia use custom svg
    if (content[0] === undefined) content[0] = '../icons/altimage.svg';
  } catch (error) {
    console.log(error.message);
  }
  return content;
}

/**
 * creates the url apicalls for the imagenames and only includes the .jpg files
 * @param {json} data
 * @return {string} urls
 */
async function createImageAPIUrls(data) {
  const urls = [];
  try {
    if (['pages'] in data['query']) {
      const pageId = Object.keys(data['query']['pages'])[0];
      const images = data['query']['pages'][pageId]['images'];
      let count = 0;
      for (let i = 0; i < images.length; i++) {
        if ((images[i]['title']).includes('.jpg') && (count < 1)) {
          let imagename = images[i]['title'];
          imagename = imagename.replace('Datei', 'File');
          urls[count] = `https://de.wikipedia.org/w/api.php?action=query&titles=${imagename}&prop=imageinfo&iilimit=50&iiend=2007-12-31T23:59:59Z&iiprop=url&format=json&formatversion=2&origin=*`;
          count++;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return urls;
}

/**
 * displays the information about the population, if available
 * @param {{}}cityInfosWikidata
 * @return {string}
 */
function getPopulation(cityInfosWikidata) {
  let population = '';
  if (['population'] in cityInfosWikidata) {
    // improve display of population number
    population = cityInfosWikidata['population'];
    population.trim();
    let laenge = population.length;
    let counter = 0;
    // add a '.' after every 3 chars
    while (laenge > 3) {
      population = population.substring(0, laenge - 3) + '.' + population.substring(laenge - 3, laenge + 4 * counter);
      laenge = laenge - 3;
      counter = counter + 1;
    }
  }
  return population;
}

/**
 * fetches the url and returns the content
 * @param {string} url
 * @return {json} content
 */
async function getContent(url) {
  let content;
  await fetch(url, {method: 'GET'})
    .then((response) => response.json())
    .then((json) => content = json)
    .catch((error) => {
      console.log(error.message);
    });
  return content;
}
