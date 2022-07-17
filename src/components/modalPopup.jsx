import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import '../css/modalPopup.css';
import '../css/index.css';
import HelpSection from './helpSection';

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
    return (<div id="modal-backdrop">
      <Modal
        className="modal-popup"
        show={this.props.showModalPopup}
      >
        <img type="button" className="close" onClick={() => this.isShowModal(true)} src="/icons/close.svg"
             alt="close"/>
        <Modal.Header>
          <Modal.Title className="modal-title">
            loco help page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HelpSection
            even={false}
            image="logo"
            textDe="loco ist eine Location-based Progressive Web App (PWA), welche dich bei deinen Reisen mit Routing Services und grundlegenden
                    Daten zu deinem Ziel unterstützt. loco bietet dir diese Dienste auch offline an, wenn du es vor der Offline-Nutzung auf Ihrem
                    Gerät installieren."
            textEn="loco is a location-based progressive web app (PWA), which supports you in finding and providing basic information for your
                    destination. loco also provides you this services offline, if you install it on your device before your offline usage."
          />
          <HelpSection
            even={true}
            image="marker_darkm"
            textDe="Mit der Stecknadel signalisierst du unseren Routing Services dein Ziel, verschiebe sie einfach an den Ort wo du hin willst und
                    die optimale Route wird für dich auf der Karte angezeigt. Falsches Ziel? Kein Problem, einfach nochmal verschieben!"
            textEn="You can search for your destination in the search bar, by entering a search term. By moving the pin where you want to go you're
                    signaling our routing services your destination, so move it and the optimal route will be displayed for you. Wrong location? No
                    problem at all, just move it again!"
          />
          <HelpSection
            even={false}
            image="recenter"
            textDe="Der Recenter Button ist für dich da, wenn du nach deiner Suche auf der Karte wieder auf deinen Standort und deine Route zurück
                    möchtest. Der Button wird allerdings nur angezeigt, wenn dein Standort nicht in der Mitte der Karte ist."
            textEn="The recenter button is there for you, if you want to return to your location after a search. However, the recenter button will
                    only appear when you're not centered. So no need to worry!"
          />
          <HelpSection
            even={true}
            image="route_infos"
            textDe="Über diesen Button kannst du die Navigationsanweisungen aus- und einblenden."
            textEn="By clicking this button you can toggle the directions tab."
          />
          <HelpSection
            even={false}
            image="route"
            textDe="Der Route Toggle Button blendet die Route auf der Karte aus oder ein, wenn du mal die Karte ohne Route betrachten möchtest."
            textEn="When you want to see the map without the route, you can toggle the route by clicking this button."
          />
          <HelpSection
            even={true}
            image="help"
            textDe="Mit dem Help Button wird dieses Popup geöffnet, falls du von den Controls etwas nachschauen möchtest."
            textEn="By clicking the help button, this popup will be opened, if at any point in time you're lost again."
          />
          <HelpSection
            even={false}
            image="search_icon"
            textDe="Bei der Search kann eine Location eingegeben werden und mit Enter bestätigt werden,
                      daraufhin werden die auf Wikipedia gefundenen Daten angezeigt."
            textEn="When searching for a location in the searchbar and pressing enter, the matching wikipedia data will be displayed. "
          />
          <div className="help-section">
            <div className="help-text">
              <p>{'Über das Icon wirst du zur Beta-Version der App weitergeleitet. Dabei handelt es sich um eine Version mit 3D-Maps von Deck.gl.'}</p>
              <p>{"Via the icon you will be redirected to the beta version of the app. It's a version with 3D-Maps from Deck.gl."}</p>
            </div>
            <img className="beta" src={'/icons/beta.svg'} alt="logo" onClick={
              () => {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
              }
            }/>
          </div>
          <HelpSection
            even={false}
            image="contact"
            textDe="Kontakt: Thomas Schmitz E-Mail: thomasschmitz814@gmail.com"
            textEn="Contact: Thomas Schmitz E-mail: thomasschmitz814@gmail.com"
          />
          <div className="modal-footer">
            <p>GitHub</p>
            <img className="github modal-footer" alt="github" src="/icons/GitHub-Mark.svg" onClick={
              () => window.open('https://github.com/DHBW-Hanger/loco')
            }/>
          </div>
        </Modal.Body>
      </Modal>
    </div>);
  }
}

export default ModalPopup;
