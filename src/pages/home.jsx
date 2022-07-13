import React, {Component} from 'react';
import MyMap from '../components/map';
import ModalPopup from '../components/modalPopup';
import ModalSheet from '../components/modalSheet';
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
      townImage: '',
      federalState: '',
      postCode: 0,
      population: 0,
      targetMarkerLocation: {lat: 47.66, lon: 9.49},
    };

    this.helpHandler = this.helpHandler.bind(this);
  }

  /**
   * handle the help button click
   */
  helpHandler() {
    this.setState({
      showModalPopup: true,
    });

    const event = new CustomEvent('addMarker', {
      detail: {
        lat: 47.67,
        lon: 9.50,
      },
    });
    document.dispatchEvent(event);
  }

  isShowPopup = (status) => {
    this.setState({showModalPopup: status});
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
              handleSearch(this.search).then((r) => {
                this.setState({
                  countryName: r.country,
                  townName: r.city,
                  townDescription: r.townInfo,
                  townImage: r.image,
                  federalState: r.state,
                  postCode: r.postCode,
                  population: r.population,
                });
                // if r is not empty open modalsheet
                if (Object.keys(r).length !== 0) {
                  const submitButton = document.getElementsByClassName('submit-button')[0];
                  submitButton.click();
                }
              });
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
