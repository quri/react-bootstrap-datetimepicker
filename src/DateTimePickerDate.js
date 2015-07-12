import React, { Component, PropTypes } from "react";
import DateTimePickerDays from "./DateTimePickerDays";
import DateTimePickerMonths from "./DateTimePickerMonths";
import DateTimePickerYears from "./DateTimePickerYears";

export default class DateTimePickerDate extends Component {
  static propTypes = {
    subtractMonth: PropTypes.func.isRequired,
    addMonth: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    daysOfWeekDisabled: PropTypes.array,
    setSelectedDate: PropTypes.func.isRequired,
    subtractYear: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    setViewMonth: PropTypes.func.isRequired,
    setViewYear: PropTypes.func.isRequired,
    addDecade: PropTypes.func.isRequired,
    subtractDecade: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object
  }

  constructor(props) {
    super(props);
    const viewModes = {
      "days": {
        daysDisplayed: true,
        monthsDisplayed: false,
        yearsDisplayed: false
      },
      "months": {
        daysDisplayed: false,
        monthsDisplayed: true,
        yearsDisplayed: false
      },
      "years": {
        daysDisplayed: false,
        monthsDisplayed: false,
        yearsDisplayed: true
      }
    };
    this.state = viewModes[this.props.viewMode] || viewModes[Object.keys(viewModes)[this.props.viewMode]] || viewModes.days;
  }

  showMonths = () => {
    return this.setState({
      daysDisplayed: false,
      monthsDisplayed: true
    });
  }

  showYears = () => {
    return this.setState({
      monthsDisplayed: false,
      yearsDisplayed: true
    });
  }

  setViewYear = (e) => {
    this.props.setViewYear(e.target.innerHTML);
    return this.setState({
      yearsDisplayed: false,
      monthsDisplayed: true
    });
  }

  setViewMonth = (e) => {
    this.props.setViewMonth(e.target.innerHTML);
    return this.setState({
      monthsDisplayed: false,
      daysDisplayed: true
    });
  }

  renderDays = () => {
    if (this.state.daysDisplayed) {
      return (
      <DateTimePickerDays
            addMonth={this.props.addMonth}
            daysOfWeekDisabled={this.props.daysOfWeekDisabled}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            selectedDate={this.props.selectedDate}
            setSelectedDate={this.props.setSelectedDate}
            showMonths={this.showMonths}
            showToday={this.props.showToday}
            subtractMonth={this.props.subtractMonth}
            viewDate={this.props.viewDate}
      />
      );
    } else {
      return null;
    }
  }

  renderMonths = () => {
    if (this.state.monthsDisplayed) {
      return (
      <DateTimePickerMonths
            addYear={this.props.addYear}
            selectedDate={this.props.selectedDate}
            setViewMonth={this.setViewMonth}
            showYears={this.showYears}
            subtractYear={this.props.subtractYear}
            viewDate={this.props.viewDate}
      />
      );
    } else {
      return null;
    }
  }

  renderYears = () => {
    if (this.state.yearsDisplayed) {
      return (
      <DateTimePickerYears
            addDecade={this.props.addDecade}
            selectedDate={this.props.selectedDate}
            setViewYear={this.setViewYear}
            subtractDecade={this.props.subtractDecade}
            viewDate={this.props.viewDate}
      />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
    <div className="datepicker">
      {this.renderDays()}

      {this.renderMonths()}

      {this.renderYears()}
    </div>
    );
  }
}

