import React, {useState, useRef} from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import '../css/modalsheet.css';
import {BiLocationPlus} from 'react-icons/Bi';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/Io';
import {getImages, townInfoWiki, searchGeoCodeInfos, getPopulation} from '../js/wikipediaCall';


import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button
} from 'framework7-react';

import ModalPopup from "../components/modalPopup";
import ModalSheet from "../components/modalSheet";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalPopup: false,
      showModalSheet: true,
      sheet: null,
      search: '',
      townInfo: {},
      townImage1: ''
    }
  }

  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };

  isShowSheet = (status) => {
    this.setState({ showModalPopup: status });
  };

  /* eslint-enable*/
  render() {
    return (
      <Page name='home'>

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
            />
          </NavRight>
          <Searchbar
            className="searchbar-demo"
            expandable
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButton={!theme.aurora}
          />
        </Navbar>

        <ModalPopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
        />

        <MyMap/>

        <ModalSheet
          showModalPopup={this.state.showModalSheet}
          onPopupClose={this.isShowSheet}
        />

      </Page>
    );
  }
}

export default App;
