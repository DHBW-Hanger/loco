import React, {Component} from 'react';

/**
 * @param {boolean} even - if section could be even or not
 * @param {string} image - image name
 * @param {string} textDe - description in german
 * @param {string} textEn - description in english
 */
class HelpSection extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      even: props.even,
      image: props.image,
      textDe: props.textDe,
      textEn: props.textEn,
    };
  }

  /**
   * render the component
   * @return {JSX.Element}
   */
  render() {
    if (this.props.even) {
      return (
        <div className="help-section">
          <div className="help-text">
            <p>{this.props.textDe}</p>
            <p>{this.props.textEn}</p>
          </div>
          <img src={`/icons/${this.props.image}.svg`} alt="logo"/>
        </div>
      );
    } else {
      return (
        <div className="help-section">
          <img src={`/icons/${this.props.image}.svg`} alt="logo"/>
          <div className="help-text">
            <p>{this.props.textDe}</p>
            <p>{this.props.textEn}</p>
          </div>
        </div>
      );
    }
  }
}

export default HelpSection;