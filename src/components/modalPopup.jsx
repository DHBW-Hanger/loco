import React, {Component, Fragment} from 'react';
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
          <img type="button" className="close" onClick={() => this.isShowModal(true)} src="/icons/recenter.svg" alt="close"/>
          <Modal.Header>
            <Modal.Title className="modal-title">
              TITLE Mollit officia ut sit proident anim
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="help-content">
              <div className="help-section">
                <img src="/icons/logo.svg" alt="logo"/>
                <p className="help-text">Dolore aute esse ea velit ullamco. Esse dolore aliquip magna quis elit culpa laborum laborum duis veniam
                  sint. Ipsum cillum dolore non quis irure aliquip et magna. Cillum anim esse dolore. Labore aliqua aliquip labore culpa eiusmod do
                  proident. Consequat in enim sit id proident occaecat proident.
                </p>
              </div>
              <div className="help-section">
                <p className="help-text">Duis commodo aliquip ea eu dolore cillum non ut deserunt Lorem deserunt. Officia eu irure fugiat cupidatat
                  fugiat magna ad sint aute proident. Tempor dolor fugiat incididunt do deserunt dolore tempor excepteur id dolor. Pariatur sint velit
                  do veniam consectetur ex mollit ipsum ipsum nostrud eu proident officia proident irure. Mollit cillum aliquip ad Lorem veniam.
                </p>
                <img src="/icons/marker_darkm.svg" alt="logo"/>
              </div>
              <div className="help-section">
                <img src="/icons/recenter.svg" alt="logo"/>
                <p className="help-text">Qui in nulla est labore excepteur reprehenderit esse aliqua elit ea in sunt ipsum consectetur laborum. Et
                  ipsum ut ex laboris mollit irure adipisicing ex veniam amet. Quis dolor duis adipisicing proident nulla ut aliqua ea nisi ad sint
                  nostrud amet. Minim ipsum ad tempor minim mollit eiusmod consequat ad aliqua consectetur.
                </p>
              </div>
              <div className="help-section">
                <p className="help-text">Consectetur reprehenderit deserunt pariatur ipsum ullamco laboris amet cillum exercitation proident fugiat
                  deserunt magna magna. In excepteur nisi aliqua consequat sint in esse. Aute laboris nulla reprehenderit quis enim minim. Dolor
                  dolore exercitation ut proident.
                </p>
                <img src="/icons/help.svg" alt="logo"/>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalPopup;
