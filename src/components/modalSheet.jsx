import React, {Component} from 'react';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/Io';
import '../css/modalSheet.css';

import {
  Button,
  Sheet,
  BlockTitle,
  List,
} from 'framework7-react';
import ModalListElement from './modalListElement';


/**
 * modalSheet component
 *
 * @param {boolean} status - status of the modal
 * @param {string} title - title of the town
 * @param {string} description - description of the town
 * @param {string} image - image of the town
 * @param {string} federalState - federal state of the town
 * @param {number} postCode - post code of the town
 * @param {number} population - population of the town
 */
class ModalSheet extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      completeAddress: props.completeAddress,
      townName: props.townName,
      townDescription: props.townDescription,
      townDescription2: props.townDescription2,
      townImage: props.townImage,
      federalState: props.federalState,
      postCode: props.postCode,
      population: props.population,
      targetMarkerLocation: props.targetMarkerLocation,
      sheetOpened: true,
      showMoreInfo: false,
    };
  }

  /**
   * render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <Sheet
        className="demo-sheet-swipe-to-step"
        swipeToClose
        swipeToStep
        backdrop
        onSheetStepClose={() => {
          this.setState({sheetOpened: !this.state.sheetOpened});
        }}
        onSheetStepOpen={() => {
          this.setState({sheetOpened: !this.state.sheetOpened});
        }}
      >
        <div className="sheet-modal-swipe-step">
          <div className="sheet-header display-flex padding justify-content-left align-items-center">
            <img src={this.props.townImage}
              alt="city image" className="wiki-pic"/>
            <div className="display-flex align-items-center">
              <div className="city-text">
                <b className="sheet-text-main">{this.props.townName}</b>
                <div>
                  <b className="sheet-text-secondary">{this.props.townDescription} </b>
                  {(this.state.showMoreInfo === true) ?
                    <b className="sheet-text-secondary">{this.props.townDescription2}</b> : ''}
                  {(this.props.townDescription2) ?
                    <Button className="button-more-description" onClick={() => {
                      this.setState({showMoreInfo: !this.state.showMoreInfo});
                    }}>
                      {this.state.showMoreInfo === true ? 'Hide' : 'More'}
                    </Button> : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="padding-horizontal padding-bottom">
            <Button large fill round onClick={() => {
              console.log(this.props.targetMarkerLocation);
            }}>
              <div style={{fontSize: '24px', paddingTop: 4, paddingRight: 4}}>
                <TiLocationArrowOutline/>
              </div>
              Route
            </Button>
            <div className="margin-top text-align-center icon-color">
              {(this.state.sheetOpened === false) ?
                <IoIosArrowDown/> : <IoIosArrowUp/>}
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top sheet-text-main">
          Information:
        </BlockTitle>

        <List noHairlines className="sheet-container">
          <ModalListElement title="Adresse" data={this.props.completeAddress}/>
          <ModalListElement title="Land" data={this.props.countryName}/>
          <ModalListElement title="Bundesland" data={this.props.federalState}/>
          <ModalListElement title="Postleitzahlen" data={this.props.postCode}/>
          <ModalListElement title="Einwohner" data={this.props.population}/>
        </List>
      </Sheet>
    );
  }
}

export default ModalSheet;
