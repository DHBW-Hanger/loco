import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import '../css/modalPopup.css';
import '../css/index.css';

/**
 * modalPopup component
 *
 * @param {boolean} status - status of the modal
 */
class ModalPopup extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  isShowModal = (status) => {
    this.handleClose();
    this.setState({showModal: status});
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  /**
   * render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      <div id="modal-backdrop">
        <Modal
          className="modal-popup"
          show={this.props.showModalPopup}
        >
          <img type="button" className="close" onClick={() => this.isShowModal(true)} src="/icons/close.svg" alt="close"/>
          <Modal.Header>
            <Modal.Title className="modal-title">
              Loco help page
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="help-content">
              <div className="help-section">
                <img src="/icons/logo.svg" alt="logo"/>
                <p className="help-text"> Loco ist eine location-based progressive web app (PWA), welche dich bei deinen Reisen mit routing
                  services und grundlegenden Daten zu deinem Ziel unterstützt.<br/> <br/>
                  Loco is a location-based progressive web app (PWA), which supports you in finding and providing basic information for your destination. <br/>
                  Loco also provides you this services offline, if you install it on your device before your offline usage.
                </p>
              </div>
              <div className="help-section">
                <p className="help-text"> Mit der Stecknadel signalisierst unseren routing services dein Ziel,
                  verschiebe sie einfach dort wo du hin willst und die optimale Route wird für dich auf der Karte angezeigt.
                  Falsches Ziel? Kein Problem, einfach nochmal verschieben!
                  <br/> <br/>
                  By moving the pin where you want to go you're signaling our routing services your destination, so move it and the optimal route will be displayed for you.
                  Wrong location? No problem at all, just move it again!
                </p>
                <img src="/icons/marker_darkm.svg" alt="logo"/>
              </div>
              <div className="help-section">
                <img src="/icons/recenter.svg" alt="logo"/>
                <p className="help-text"> Der Recenter Button ist für dich da, wenn du nach deiner Suche auf der Karte
                  wieder auf deinen Standort und deine Route zurück willst. Der Button wird allerdings nur angezeigt,
                  wenn dein Standort nicht in der Mitte der Karte ist.
                  <br/> <br/>
                  The recenter button is there for you if, after your search on the map, you  want to go back to your
                  location and the route towards your destination. However, the recenter button will only appear when you're not centered. So no need to worry!
                </p>
              </div>
              <div className="help-section">
                <p className="help-text"> Mit dem Help Button wird dieses Popup geöffnet, falls du von den Controls etwas nachschauen möchtest.
                  <br/>
                  <br/>
                  By clicking the help button, this pupup will be opened, if at any point in time you're lost again.
                </p>
                <img src="/icons/help.svg" alt="logo"/>
              </div>
              <div className="help-section">
                <p className="help-text"> Hilfe für die Suche

                </p>
                <img src=""/>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalPopup;
