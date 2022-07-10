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
      <div id={'modal-backdrop'}>
        <Modal
          className="modal-popup"
          show={this.props.showModalPopup}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <img type="button" className="close" onClick={() => this.isShowModal(true)} src="../icons/recenter.svg" alt="close"/>
            <Modal.Title className="modal-title">
              TITLE Mollit officia ut sit proident anim.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="help-content">
              <p>Dolore aute esse ea velit ullamco. Esse dolore aliquip magna quis elit culpa laborum laborum duis veniam sint. Ipsum cillum dolore
                non quis irure aliquip et magna. Cillum anim esse dolore. Labore aliqua aliquip labore culpa eiusmod do proident. Consequat in enim sit
                id proident occaecat proident. Quis exercitation nisi laborum exercitation excepteur ullamco duis anim deserunt officia ullamco fugiat.
                Cupidatat cupidatat dolor dolor reprehenderit consequat ipsum laboris eiusmod qui in eiusmod esse elit consequat anim. Excepteur qui
                officia eu pariatur dolore proident dolor et. Fugiat reprehenderit aliquip do ut tempor laboris ipsum.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalPopup;
