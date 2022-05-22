let userInput;
let searchUrl = 'https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&formatversion=2&origin=*&srlimit=20&srsearch=';


function setup () {
  userInput = "Friedrichshafen";
  goWiki();

  async function goWiki () {
    let url = searchUrl + userInput;
    console.log(url);
    fetch(
      url,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(json => {
        console.log(json['query']['search'][0]);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
export default setup;
