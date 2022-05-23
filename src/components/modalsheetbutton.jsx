import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/Io';
import React, { useState, useRef } from 'react';

class ModalSheetButton extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isFoldOut: false,
      }
    } 
  
    render() {
      return (
        <div className="margin-top text-align-center" onClick={()=>this.setState({ isFoldOut: !this.state.isFoldOut })}>
          { this.state.isFoldOut
              ? <IoIosArrowDown />
              : <IoIosArrowUp />
            }
        </div>
      );
    }
}

export default ModalSheetButton;