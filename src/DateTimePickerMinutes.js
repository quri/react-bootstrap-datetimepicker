import React, { Component, PropTypes } from "react";
import Constants from "./Constants.js";

export default class DateTimePickerMinutes extends Component {
  static propTypes = {
    setSelectedMinute: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
  }

  renderSwitchButton = () => {
    return this.props.mode === Constants.MODE_TIME ?
        (
            <ul className="list-unstyled">
              <li>
                <span className="btn picker-switch" onClick={this.props.onSwitch} style={{width: "100%"}}><span className="glyphicon glyphicon-time" /></span>
              </li>
            </ul>
        ) :
        null;
  }

  render() {
    return (
      <div className="timepicker-minutes" data-action="selectMinute" style={{display: "block"}}>
        {this.renderSwitchButton()}
        <table className="table-condensed">
          <tbody>
            <tr>
              <td className="minute" onClick={this.props.setSelectedMinute}>00</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>05</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>10</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>15</td>
            </tr>

            <tr>
              <td className="minute" onClick={this.props.setSelectedMinute}>20</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>25</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>30</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>35</td>
            </tr>

            <tr>
              <td className="minute" onClick={this.props.setSelectedMinute}>40</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>45</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>50</td>

              <td className="minute" onClick={this.props.setSelectedMinute}>55</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

