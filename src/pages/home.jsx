import React, {useState, useRef} from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import '../css/modalsheet.css';
import {BiLocationPlus} from 'react-icons/Bi';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/Io';
import {getImages, townInfoWiki, searchGeoCodeInfos} from '../js/wikipediaCall';


import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
  f7,
} from 'framework7-react';

/**
 *
 * @return {JSX.Element} - App component
 * @constructor
 */
export default function App() {
  const [sheetOpened, setSheetOpened] = useState(false);
  const sheet = useRef(null);
  const [search, setSearch] = useState('');
  const [townInfo, setTownInfo] = useState({});
  const [townImage1, setTownImage1] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');

  //
  // muss noch mit Marker verbunden werden
  //

  // async function setTargetGoal(e) {
  //   setSearch({search: await reverseGeocoding(lon, lat)});
  // }


  /**
   *
   * @param {object} e
   * @return {Promise<void>}
   */
  async function handleSearch(e) {
    if (search === '') return;
    let geocodeInfo = await searchGeoCodeInfos(search);

    if (geocodeInfo.length === 0) {
      console.log('empty');
    } else {
      // select top result
      geocodeInfo = geocodeInfo[0];

      let stadt = geocodeInfo.address.town;
      setTown({town: stadt});
      console.log(geocodeInfo.address);

      let towninfo = await townInfoWiki(stadt);
      if (towninfo.length > 150) {
        const wherecuttext = towninfo.indexOf(' ', 150);
        towninfo = towninfo.substring(0, wherecuttext) + '...';
      }
      setTownInfo({townInfo: towninfo});
      const images = await getImages(stadt);
      setTownImage1({townImage1: images[0]});

      // if country is Germany
      if(geocodeInfo.address.country === "Deutschland"){
        setState({state: geocodeInfo.address.state});
        setPostcode({postcode: geocodeInfo.address.postcode});
      }
    }
  }

  const onPageBeforeOut = () => {
    // Close opened sheets on page out

    f7.sheet.close();
  };

  const onPageBeforeRemove = () => {
    // Destroy sheet modal when page removed
    if (sheet.current) sheet.current.destroy();
  };

// Needs changes (on Button Press up and down the modal box)
// also add route infiormation if clikced on route (part close it and also make background appear as normal and nort darker)
  /*eslint-disable*/
  const sheetPartClose = () => {
    // Close sheet part
    f7.sheet.close();
  };

  const sheetPartOpen = () => {
    // Open sheet part
    f7.sheet.open(sheet.current);
  };

  /* eslint-enable*/
  return (
      <Page name='home' onPageBeforeOut={onPageBeforeOut} onPageBeforeRemove={onPageBeforeRemove}>

        <Navbar>
          <img className="logo" src="/icons/logo.svg" alt="Loco"/>
          <div className="logo-text sliding">loco</div>
          <Button fill sheetOpen=".demo-sheet-swipe-to-step">
            Swipe To Step
          </Button>
          <NavRight>
            <Link
                searchbarEnable=".searchbar-demo"
                iconIos="f7:search"
                iconAurora="f7:search"
                iconMd="material:search"
            ></Link>
          </NavRight>
          <Searchbar
              className="searchbar-demo"
              expandable
              searchContainer=".search-list"
              searchIn=".item-title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disableButton={!theme.aurora}
              onSubmit={handleSearch}
          ></Searchbar>
        </Navbar>

        <MyMap/>

        <Sheet
            className="demo-sheet-swipe-to-step"
            swipeToClose
            swipeToStep
            backdrop
            onSheetStepClose={() => {
              setSheetOpened(false);
            }}
            onSheetStepOpen={() => {
              setSheetOpened(true);
            }}
        >
          <div className="sheet-modal-swipe-step">
            <div className="display-flex padding justify-content-space-between align-items-center">

              <div className="display-flex align-items-center">
                <img
                    src={townImage1.townImage1}
                    alt="Avatar" className="wiki-pic"></img>
                <div>
                  <b className="sheet-text-main">{town.town}</b>
                  <div>
                    <b className="sheet-text-secondary">{townInfo.townInfo}</b>
                  </div>
                </div>
              </div>

              <Button fill round align-items-center>
                <div style={{fontSize: '24px', paddingTop: 7}}>
                  <BiLocationPlus/>
                </div>
              </Button>
            </div>

            <div className="padding-horizontal padding-bottom">
              <Button large fill round>
                <div style={{fontSize: '24px', paddingTop: 4, paddingRight: 4}}>
                  <TiLocationArrowOutline/>
                </div>
                Route
              </Button>
              <div className="margin-top text-align-center icon-color">
                {sheetOpened === true ? <IoIosArrowDown/> : <IoIosArrowUp/>}
              </div>
            </div>
          </div>

          <BlockTitle medium className="margin-top sheet-text-main">
            Information:
          </BlockTitle>

          <List noHairlines className="sheet-container">

            <ListItem title="Bundesland:" className="sheet-text-tertiary">
              <b slot="after" className="sheet-text-tertiary-bold">
                {state.state}
              </b>
            </ListItem>

            <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
              <b slot="after" className="sheet-text-tertiary-bold">
                {postcode.postcode}
              </b>
            </ListItem>

            <ListItem title="Einwohner:" className="sheet-text-tertiary">
              <b slot="after" className="sheet-text-tertiary-bold">
                61.221
              </b>
            </ListItem>
          </List>
        </Sheet>

      </Page>
  );
}
