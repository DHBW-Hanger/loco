import React, {useState, useRef} from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import '../css/modalsheet.css';
import {BiLocationPlus} from 'react-icons/Bi';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/Io';

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
          disableButton={!theme.aurora}
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
                src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"
                alt="Avatar" className="wiki-pic"/>
              <div>
                <b className="sheet-text-main">Friedrichshafen, 88540</b>
                <div>
                  <b className="sheet-text-secondary">Die Stadt der Lebenden lel</b>
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
              Baden-Württemberg
            </b>
          </ListItem>

          <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              88045, 88046, 88048
            </b>
          </ListItem>

          <ListItem title="Einwohner:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              61.221
            </b>
          </ListItem>

          <ListItem>
            <f7-block>
              <p className="sheet-text-tertiary">
                Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus
                on vero corporis voluptat fsjfjlksfjklfjösalkfjölkfjaölkfjaöslkdj
                fösklafjalksjdföalkfjölfkjösdlkfjasjklfdjsaölkfibus similique odit ab...
              </p>
            </f7-block>
          </ListItem>
        </List>
      </Sheet>

    </Page>
  );
};
