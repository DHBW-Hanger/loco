import React, {Component} from 'react';
import '../css/modalsheet.css'

import {
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
} from 'framework7-react';

import {BiLocationPlus} from "react-icons/Bi";
import {TiLocationArrowOutline} from "react-icons/Ti";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/Io";


// https://v4.framework7.io/react/sheet-modal

class ModalSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  isShowModal = (status) => {
    this.handleClose();
    this.setState({showModal: status});
  }

  handleClose = () => {
    this.props.onSheetClose(false);
  }

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

            <div className="display-flex align-items-center">
              <div>
                <b className="sheet-text-main">{'berlin'}</b>
                <div>
                  <b className="sheet-text-secondary">{'kdsfjkjasdkjdkasjakdf'}</b>
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
              {this.state.showModal === true ? <IoIosArrowDown/> : <IoIosArrowUp/>}
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top sheet-text-main">
          Information:
        </BlockTitle>

        <List noHairlines className="sheet-container">

          <ListItem title="Bundesland:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {'bw'}
            </b>
          </ListItem>

          <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              {123}
            </b>
          </ListItem>

          <ListItem title="Einwohner:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              61.221
            </b>
          </ListItem>
        </List>
      </Sheet>
    );
  }
}

export default ModalSheet;
