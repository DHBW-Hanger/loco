import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/Io';
import React from 'react';

/**
 * Modal sheet button component
 */
class ModalSheetButton extends React.Component {
  /**
   * initialize state
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isFoldOut: false,
    };
  }

  /**
   * render model sheet arrow
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="margin-top text-align-center" onClick={()=>this.setState({isFoldOut: !this.state.isFoldOut})}>
        { this.state.isFoldOut ?
              <IoIosArrowDown /> :
              <IoIosArrowUp />
        }
      </div>
    );
  }
}

export default ModalSheetButton;
