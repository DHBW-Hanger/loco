import React, {Component} from 'react';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowDown} from 'react-icons/Io';
import {geocodeTown} from '../js/wikipediaCall';
import '../css/modalSheet.css';

import {
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
} from 'framework7-react';


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
      markedAddress: props.markedAddress,
      townName: props.townName,
      townDescription: props.townDescription,
      townImage: props.townImage,
      federalState: props.federalState,
      postCode: props.postCode,
      population: props.population,
      targetMarkerLocation: props.targetMarkerLocation,
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
      >
        <div className="sheet-modal-swipe-step">
          <div className="display-flex padding justify-content-left align-items-center">
            <img src={this.props.townImage}
              alt="city image" className="wiki-pic"/>
            <div className="display-flex align-items-center">
              <div className="city-text">
                <b className="sheet-text-main">{this.props.townName}</b>
                <div>
                  <b className="sheet-text-secondary">{this.props.townDescription}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="padding-horizontal padding-bottom">
            <Button large fill round onClick={() => {
              geocodeTown(this.props.townName).then((response) => {
                const lat = response[0].lat;
                const lon = response[0].lon;
                this.setState({
                  targetMarkerLocation: {lat, lon},
                }, () => {
                  console.log(this.state.targetMarkerLocation);
                });
              });
            }}>
              <div style={{fontSize: '24px', paddingTop: 4, paddingRight: 4}}>
                <TiLocationArrowOutline/>
              </div>
              Route
            </Button>
            <div className="margin-top text-align-center icon-color">
              <IoIosArrowDown/>
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top sheet-text-main">
          Information:
        </BlockTitle>

        <List noHairlines className="sheet-container">
          {(this.props.completeAddress) ?
          <ListItem title="Addresse:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.completeAddress}
            </b>
          </ListItem> : ''}
          {(this.props.federalState) ?
          <ListItem title="Land:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.countryName}
            </b>
          </ListItem> : ''}
          {(this.props.federalState) ?
          <ListItem title="Bundesland:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.federalState}
            </b>
          </ListItem> : ''}
          {(this.props.postCode) ?
          <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.postCode}
            </b>
          </ListItem> : ''}
          {(this.props.population) ?
          <ListItem title="Einwohner:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.population}
            </b>
          </ListItem> : ''}
        </List>
      </Sheet>
    );
  }
}

export default ModalSheet;
