// test sheet info display
import {indexOf} from "leaflet/src/core/Util";

/**
 *
 * @param {string}input
 * @param {{}}reverse
 * @return {Promise<{}>}
 */
export async function handleSearch(input, reverse = {}) {
  const result = {};
  let completeAddress = '';
  let latitude, longitute;
  //try {
    // check if function is called via marker or submit
    if (Object.keys(reverse).length !== 0) {
      let infos = await reverseGeocoding(reverse.lng, reverse.lat);
      infos = getTown(infos);
      input = infos.address.stadt;
      completeAddress = infos.display_name;
      latitude = reverse.lat
      longitute = reverse.lng;
    }
    if (input !== '') {
      // cityInfos
      const cityInfos = await getCityInfosNominatim(input);
      if (cityInfos.length !== 0) {
        const stadt = cityInfos.address.stadt;
        // if latitude and longitude are not set, get them from cityInfos
        if (latitude === null) latitude = (Number(cityInfos.boundingbox[0]) + Number(cityInfos.boundingbox[1])) / 2;
        if (longitute === null) longitute = (Number(cityInfos.boundingbox[2]) + Number(cityInfos.boundingbox[3])) / 2;
        const cityInfosWikidata = await getCityInfosWikidata(stadt, cityInfos.address.country);
        let towninfo = await townInfoWiki(stadt);
        if (typeof towninfo === 'string') {
          let laenge = towninfo.length;
          if (laenge > 150) {
            laenge = towninfo.indexOf(' ', 150);
            if (laenge < towninfo.length && laenge > 0) {
              towninfo = towninfo.substring(0, laenge) + '...';
            }
          }
        } else {
          towninfo = '';
        }
        const imageurls = await getImages(stadt);
        let postcode = cityInfos.address.postcode;
        if (postcode == null) postcode = cityInfosWikidata.postalCode;
        if (postcode == null && stadt !== cityInfos.address.town && cityInfos.address.town !== null) {
          const postcode2 = await getCityInfosNominatim(cityInfos.address.town);
          postcode = postcode2.address.postcode;
        }
        // if no image was found in wikipedia use custom svg
        if (imageurls[0] === undefined) imageurls[0] = '../icons/altimage.svg';
        // improve display of population number
        if (['population'] in cityInfosWikidata) {
          let population = cityInfosWikidata.population;
          population.trim();
          let laenge = population.length;
          let counter = 0;
          // add a '.' after every 3 chars
          while (laenge > 3) {
            population = population.substring(0, laenge - 3) + '.' + population.substring(laenge - 3, laenge + 4 * counter);
            laenge = laenge - 3;
            counter = counter + 1;
          }
          // set state population
          result.population = population;
        }
        // set states
        result.country = cityInfos.address.country;
        result.city = stadt;
        result.townInfo = towninfo;
        result.image = imageurls[0];
        result.state = cityInfos.address.state;
        result.postCode = postcode;
        result.completeAddress = completeAddress;
        result.locationMarker = {lat: longitute, lon: latitude};
      }
    } else {
      console.log('invalid input');
    }
  //} catch (error) {
  //  console.log(error.message);
  //}
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
 * prints address on console
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
 *
 * @param {string}search
 * @return {Promise<any>}
 */
async function getCityInfosNominatim(search) {
  let data = await getContent(`https://nominatim.openstreetmap.org/search?q=${search}&format=json&polygon=1&addressdetails=1`);
  data = getTown(data[0]);
  return data;
}

/**
 *
 * @param data
 * @return {*}
 */
function getTown(data) {
  try {
    if (Object.keys(data).length !== 0) {
      if (data.address.country === 'Vereinigte Staaten von Amerika') {
        data.address.country = 'Vereinigte Staaten';
      }
      if ('city_district' in data.address) {
        data.address.stadt = data.address['city_district'];
      } else if ('town' in data.address) {
        data.address.stadt = data.address.town;
      } else if ('city' in data.address) {
        data.address.stadt = data.address.city;
      } else if ('county' in data.address && !('town') in data.address) {
        data.address.stadt = data.address.county;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

/**
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
      data = data.query.pages;
      const [id] = Object.keys(data);
      if (['*'] in data[id].revisions[0]) {
        data = data[id].revisions[0]['*'];
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
              info.population = informationen;
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
            info.postalCode = informationen;
          } else if (anfang2 !== -1) {
            ende = data.indexOf('|', anfang2);
            informationen = data.substring(anfang2, ende);
            position = informationen.indexOf('=');
            if (position !== -1) informationen = informationen.substring(position + 1);
            ende = informationen.indexOf('<');
            if (ende !== -1) informationen = informationen.substring(0, ende);
            info.postalCode = informationen;
          }
          info.all = data;
        }
      }
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
        const searchresults = bevoelkerung.results.bindings.length;
        info.population = bevoelkerung.results.bindings[0].population.value;
        for (let i = 0; i < searchresults; i++) {
          if (info.population > bevoelkerung.results.bindings[i].population.value) {
            info.population = bevoelkerung.results.bindings[i].population.value;
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
 * prints urls of images on console
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
    if (['pages'] in data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0];
      const images = data.query.pages[pageId]['images'];
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
