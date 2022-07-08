import React from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import {getImages, townInfoWiki, searchGeoCodeInfos, getPopulation} from '../js/wikipediaCall';

import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button,
} from 'framework7-react';

import ModalPopup from "../components/modalPopup";
import ModalSheet from "../components/modalSheet";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalPopup: false,
      showModalSheet: false,
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
    this.setState({ showModalSheet: status });
  };

  /* eslint-enable*/
  render() {
    return (
      <Page name='home'>

        <Navbar>
          <img className="logo" src="/icons/logo.svg" alt="Loco"/>
          <div className="logo-text sliding">loco</div>
          <Button className={'submit-button'} fill sheetOpen=".demo-sheet-swipe-to-step"> </Button>
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
            value={this.search}
            onChange={(e) => {this.search = (e.target.value)}}
            onSubmit={() => {
              const submitButton = document.getElementsByClassName('submit-button')[0]
              submitButton.click()
            }}
          />
        </Navbar>

        <ModalPopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
        />

        <MyMap/>

        <ModalSheet
          showModalPopup={this.state.showModalSheet}
          onSheetClose={this.isShowSheet}
        />

      </Page>
    );
  }
}

export default App;
