
/**
 *
 * @param search
 * @return {Promise<void>}
 */
export async function handleSearch(search) {
  let geocodeInfo = await searchGeoCodeInfos(search);
  const result = {};

  if (geocodeInfo.length === 0) {
    console.log('empty');
  } else {
    // select top result
    geocodeInfo = geocodeInfo[0];
    // city or town in keys
    if ('town' in geocodeInfo.address) {
      result.city = geocodeInfo.address.town;
    } else if ('city' in geocodeInfo.address) {
      result.city = geocodeInfo.address.city;
    }
    console.log(geocodeInfo.address);
    result.population = await getPopulation(result.city);

    result.townInfo = await townInfoWiki(result.city);
    let length = result.townInfo.length;
    if (length > 150) {
      length = townInfo.indexOf(' ', 150);
      result.townInfo = townInfo.substring(0, length) + '...';
    }
    result.image = await getImages(city)[0];

    // if country is Germany
    if (geocodeInfo.address.country === 'Deutschland') {
      result.state = geocodeInfo.address.state;
      result.postCode = geocodeInfo.address.postcode;
    }
  }

  return result;
}

// test sheet info display
export async function handleSearch1() {
  const result = {};

  result.city = 'Stuttgart';
  result.population = 635000;
  result.townInfo = 'Anim ex quis excepteur et est irure et cupidatat non.';
  result.image = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Stuttgart.svg';
  result.state = 'Baden-Württemberg';
  result.postCode = 70000;

  return result;
}

/**
 * prints address on console
 *
 * @param {float} lon
 * @param {float} lat
 * @return {Promise<void>}
 */
export async function reverseGeocoding(lon, lat) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
  const data = await response.json();
  return (data);
}

/**
 *
 * @param {string}search
 * @return {Promise<any>}
 */
export async function searchGeoCodeInfos(search) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${search}&format=json&polygon=1&addressdetails=1`);
  const data = await response.json();
  return data;
}

/**
 *
 * @param {string}location
 * @return {Promise<any>}
 */
export async function getPopulation(location) {
  const response = await fetch(`https://de.wikipedia.org/w/api.php?format=json&action=query&titles=${location}&prop=revisions&rvprop=content&rvsection=0&origin=*`);
  let data = await response.json();
  data = data['query']['pages'];

  // gets first key from data
  const [id] = Object.keys(data);
  data = data[id]['revisions'][0]['*'];
  console.log(data);
  return data;
}

/**
 * returns the first extract in wikipedia about the location and removes all html elements and brackets
 * since the pageid changes from every apicall, the first key in the dictionary data['query']['pages] is collected
 *
 * @param {string} location
 * @return {string} data
 */
export async function townInfoWiki(location) {
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
  } catch {
  }
  return (
    data
  );
}


/**
 * prints urls of images on console
 *
 * @param {string} location
 * @return {string} urls of images
 */
export async function getImages(location) {
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
  } catch {
  }
  return content;
}

/**
 * creates the url apicalls for the imagenames and only includes the .jpg files
 * @param {json} data
 * @return {string} urls
 */
async function createImageAPIUrls(data) {
  const pageId = Object.keys(data.query.pages)[0];
  const images = data.query.pages[pageId]['images'];
  const urls = [];
  let count = 0;
  for (let i = 0; i < images.length; i++) {
    if ((images[i]['title']).includes('.jpg') && (count < 1)) {
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
 * @return {json} content
 */
async function getContent(url) {
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


