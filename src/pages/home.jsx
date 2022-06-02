import React, {useState, useRef} from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import '../css/modalsheet.css';
import {BiLocationPlus} from 'react-icons/Bi';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/Io';

import {
  Page,
  // Navbar,
  // Block,
  Button,
  Sheet,
  // Toolbar,
  // Link,
  // PageContent,
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

  return (
    <Page name='home' onPageBeforeOut={onPageBeforeOut} onPageBeforeRemove={onPageBeforeRemove}>

      <div className="navbar">
        <div className="navbar-bg"></div>
        <div className="navbar-inner">
          <Button fill sheetOpen=".demo-sheet-swipe-to-step">
            Swipe To Step
          </Button>
          <img className="logo" src="../img/logo.png" alt="Loco" />
          <div className="logo-text sliding">LOCO</div>
          <div className="right">
            <img src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="Avatar" className="avatar"></img>
          </div>
        </div>
      </div>
      <MyMap />

      <Sheet
        className="demo-sheet-swipe-to-step"
        style={{'height': 'auto', '--f7-sheet-bg-color': '#fff'}}
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
              <img src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="Avatar" className="wiki-pic"></img>
              <div style={{fontSize: '24px', opacity: 0.9, paddingLeft: 15.0}}>
                <b>Friedrichshafen, 88540</b>
                <div style={{fontSize: '16px', opacity: 0.75}}>
                  <b>Die Stadt der Lebenden lel</b>
                </div>
              </div>
            </div>

            <Button fill round align-items-center>
              <div style={{fontSize: '24px', paddingTop: 7}}>
                <BiLocationPlus />
              </div>
            </Button>
          </div>

          <div className="padding-horizontal padding-bottom">
            <Button large fill round>
              <div style={{fontSize: '24px', paddingTop: 4, paddingRight: 4}}>
                <TiLocationArrowOutline />
              </div>
              Route
            </Button>
            <div className="margin-top text-align-center">
              {sheetOpened == true ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top">
          Information:
        </BlockTitle>
        <List noHairlines>
          <ListItem title="Bundesland:">
            <b slot="after" className="text-color-black">
              Baden-Württemberg
            </b>
          </ListItem>

          <ListItem title="Postleitzahlen:">
            <b slot="after" className="text-color-black">
              88045, 88046, 88048
            </b>
          </ListItem>

          <ListItem title="Einwohner:">
            <b slot="after" className="text-color-black">
              61.221
            </b>
          </ListItem>

          <ListItem>
            <f7-block>
              <p>
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
