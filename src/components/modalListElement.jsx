import React, {Component} from 'react';
import {ListItem} from 'framework7-react';
import '../css/modalSheet.css';


/**
 * modalListElement component
 * @param {string} data - data to be displayed
 * @param {string} title - title of the element
 */
class ModalListElement extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: props.date,
      title: props.title,
    };
  }

  /**
   * render the component
   * @return {JSX.Element}
   */
  render() {
    return (
      (this.props.data) ?
        <ListItem title={`${this.props.title}:`} className="sheet-text-tertiary">
          <b slot="after" className="sheet-text-tertiary-bold">
            {this.props.data}
          </b>
        </ListItem> : ''
    );
  }
}

export default ModalListElement;