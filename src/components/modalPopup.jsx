import React, {Component, Fragment} from 'react';
import {Modal} from 'react-bootstrap';

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
      <Fragment>
        <Modal show={this.props.showModalPopup} onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="sign-in-title">
              React Modal Pop up Example
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <hr/>
            <div className="signUp">
              <p>Want to close the pop up?
                <button type="button" className="link-button" onClick={() => this.isShowModal(true)}> Close</button>
              </p>
            </div>
          </Modal.Body>

        </Modal>
      </Fragment>

    );
  }
}

export default ModalPopup;
