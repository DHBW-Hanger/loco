import React from 'react';
import MyMap from '../components/map';
import '../css/index.css';
import {handleSearch1} from '../js/wikipediaCall';

import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button,
} from 'framework7-react';

import ModalPopup from '../components/modalPopup';
import ModalSheet from '../components/modalSheet';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalPopup: false,
      sheet: null,
      search: '',
      townName: '',
      townDescription: '',
      townImage: '',
      federalState: '',
      postCode: 0,
      population: 0,
    };
  }

  isShowPopup = (status) => {
    this.setState({showModalPopup: status});
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
            onChange={(e) => {
              this.search = (e.target.value);
            }}
            onSubmit={() => {
              handleSearch1(this.search).then((r) => {
                this.setState({
                  townName: r.city,
                  townDescription: r.townInfo,
                  townImage: r.image,
                  federalState: r.state,
                  postCode: r.postCode,
                  population: r.population,
                });
                const submitButton = document.getElementsByClassName('submit-button')[0];
                submitButton.click();
              });
            }}
          />
        </Navbar>

        <ModalPopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
        />

        <MyMap/>

        <ModalSheet
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
