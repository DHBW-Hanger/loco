import React, {Component} from 'react';
import {BiLocationPlus} from 'react-icons/Bi';
import {TiLocationArrowOutline} from 'react-icons/Ti';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/Io';
import {geocodeTown} from '../js/wikipediaCall';
import '../css/modalsheet.css';

import {
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
} from 'framework7-react';


// https://v4.framework7.io/react/sheet-modal


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
          <div className="display-flex padding justify-content-space-between align-items-center">
            <img src={this.props.townImage}
              alt="city image" className="wiki-pic"/>
            <div className="display-flex align-items-center">
              <div>
                <b className="sheet-text-main">{this.props.townName}</b>
                <div>
                  <b className="sheet-text-secondary">{this.props.townDescription}</b>
                </div>
              </div>
            </div>

            <Button fill round align-items-center onClick={
              () => {
                geocodeTown(this.props.townName).then((response) => {
                  const lat = response[0].lat;
                  const lon = response[0].lon;
                  this.setState({
                    targetMarkerLocation: {lat, lon},
                  }, () => {
                    console.log(this.state.targetMarkerLocation);
                  });
                });
              }
            }>
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
              {/* TODO turn arrow on step */}
              {true ? <IoIosArrowDown/> : <IoIosArrowUp/>}
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top sheet-text-main">
          Information:
        </BlockTitle>

        <List noHairlines className="sheet-container">

          <ListItem title="Bundesland:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.federalState}
            </b>
          </ListItem>

          <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.postCode}
            </b>
          </ListItem>

          <ListItem title="Einwohner:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {this.props.population}
            </b>
          </ListItem>
        </List>
      </Sheet>
    );
  }
}

export default ModalSheet;
