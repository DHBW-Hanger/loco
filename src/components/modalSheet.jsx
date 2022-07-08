import React, {Component, useRef, useState} from 'react';

import {
  Link,
  Page,
  Searchbar,
  theme,
  NavRight,
  Navbar,
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
  f7,
} from 'framework7-react';
import {BiLocationPlus} from "react-icons/Bi";
import {TiLocationArrowOutline} from "react-icons/Ti";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/Io";


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
    this.props.onPopupClose(false);
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
              <img
                src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"
                alt="Avatar" className="wiki-pic"/>
              <div>
                <b className="sheet-text-main">Friedrichshafen, 88540</b>
                <div>
                  <b className="sheet-text-secondary">Die Stadt der Lebenden lel</b>
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
              {this.isShowModal === true ? <IoIosArrowDown/> : <IoIosArrowUp/>}
            </div>
          </div>
        </div>

        <BlockTitle medium className="margin-top sheet-text-main">
          Information:
        </BlockTitle>
        <List noHairlines className="sheet-container">
          <ListItem title="Bundesland:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              Baden-Württemberg
            </b>
          </ListItem>

          <ListItem title="Postleitzahlen:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              88045, 88046, 88048
            </b>
          </ListItem>

          <ListItem title="Einwohner:" className="sheet-text-tertiary">
            <b slot="after" className="sheet-text-tertiary-bold">
              61.221
            </b>
          </ListItem>

          <ListItem>
            <f7-block>
              <p className="sheet-text-tertiary">
                Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus
                on vero corporis voluptat fsjfjlksfjklfjösalkfjölkfjaölkfjaöslkdj
                fösklafjalksjdföalkfjölfkjösdlkfjasjklfdjsaölkfibus similique odit ab...
              </p>
            </f7-block>
          </ListItem>
        </List>
      </Sheet>
    );
  }
}

export default ModalSheet;
