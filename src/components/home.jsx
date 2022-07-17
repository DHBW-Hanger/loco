import React, {Component} from 'react';
import MyMap from './map';
import ModalPopup from './modalPopup';
import ModalSheet from './modalSheet';
import {handleSearch} from '../js/wikipediaCall';
import '../css/index.css';

import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button,
} from 'framework7-react';


/**
 * @param {boolean} status - status of the modal
 */
class App extends Component {
  /**
   * initialize the component
   * @param {object} props - properties
   *
   */
   constructor(props) {
    super(props);
    this.state = {
      showModalPopup: false,
      sheet: null,
      search: '',
      countryName: '',
      townName: '',
      townDescription: '',
      townDescription2: '',
      townImage: '',
      federalState: '',
      postCode: 0,
      population: 0,
      targetMarkerLocation: {lat: 47.6652, lon: 9.4902},
      completeAddress: '',
    };

    this.helpHandler = this.helpHandler.bind(this);
    this.markerClickHandler = this.markerClickHandler.bind(this);
  }

  /**
   * handle the help button click
   */
  helpHandler() {
    this.setState({
      showModalPopup: true,
    });
  }

  isShowPopup = (status) => {
    this.setState({showModalPopup: status});
  };

  /**
   * handle the marker click
   * @param {object} location - location of the marker
   */
   markerClickHandler(location) {
    this.triggerModalSheet('', location);
  }

  /**
   * trigger the modal sheet and get the data from wikipedia
   * @param {string} town - town name
   * @param {object} location - location of the marker
   */
  triggerModalSheet = (town, location) => {
    handleSearch(town, location).then((r) => {
      this.setState({
        countryName: r.country,
        townName: r.city,
        townDescription: r.townDescription,
        townImage: r.image,
        federalState: r.state,
        postCode: r.postCode,
        population: r.population,
        completeAddress: r.markedAddress,
        targetMarkerLocation: r.locationMarker,
        townDescription2: r.townDescription2,
      });


      // if r is not empty and completeAddress excluded: open modal sheet
      if (Object.keys(r).length > 1) {
        const submitButton = document.getElementsByClassName('submit-button')[0];
        submitButton.click();
      }
    });
  };

  /**
   * render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <Page name='home'>

        <Navbar>
          <img className="logo" src="/icons/logo.svg" alt="Loco" />
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
            onChange={(e) => {
              this.search = (e.target.value);
            }}
            onSubmit={() => {
              this.triggerModalSheet(this.search, {});
            }}
          />
        </Navbar>

        <ModalPopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
        />

        <MyMap
          targetMarkerLocation={this.state.targetMarkerLocation}
          helpHandler={this.helpHandler}
        />

        <ModalSheet
          countryName={this.state.countryName}
          townName={this.state.townName}
          townDescription={this.state.townDescription}
          townImage={this.state.townImage}
          federalState={this.state.federalState}
          postCode={this.state.postCode}
          population={this.state.population}
        />

      </Page>
    );
  }
}

export default App;
