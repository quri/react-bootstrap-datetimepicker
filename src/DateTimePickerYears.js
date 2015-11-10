import React, { Component, PropTypes } from "react";
import classnames from "classnames";

export default class DateTimePickerYears extends Component {
  static propTypes = {
    subtractDecade: PropTypes.func.isRequired,
    addDecade: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    setViewYear: PropTypes.func.isRequired
  }

  renderYears = () => {
    var classes, i, year, years;
    years = [];
    year = parseInt(this.props.viewDate.year() / 10, 10) * 10;
    year--;
    i = -1;
    while (i < 11) {
      classes = {
        year: true,
        old: i === -1 | i === 10,
        active: this.props.selectedDate.year() === year
      };
      years.push(<span className={classnames(classes)} key={year}onClick={this.props.setViewYear}>{year}</span>);
      year++;
      i++;
    }
    return years;
  }

  render() {
    var year;
    year = parseInt(this.props.viewDate.year() / 10, 10) * 10;
    return (
      <div className="datepicker-years" style={{display: "block"}}>
        <table className="table-condensed">
          <thead>
            <tr>
              <th className="prev" onClick={this.props.subtractDecade}>‹</th>

              <th className="switch" colSpan="5">{year} - {year + 9}</th>

              <th className="next" onClick={this.props.addDecade}>›</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="7">{this.renderYears()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

