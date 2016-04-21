import React, { Component, PropTypes } from "react";
import moment from "moment";
import classnames from "classnames";
import DateTimePicker from "./DateTimePicker.js";
import Constants from "./Constants.js";

export default class DateTimeField extends Component {
  static defaultProps = {
    dateTime: moment().format("x"),
    format: "x",
    showToday: true,
    viewMode: "days",
    daysOfWeekDisabled: [],
    size: Constants.SIZE_MEDIUM,
    mode: Constants.MODE_DATETIME,
    zIndex: 999,
    onChange: (x) => {
      console.log(x);
    }
  }

  resolvePropsInputFormat = () => {
    if (this.props.inputFormat) { return this.props.inputFormat; }
    switch (this.props.mode) {
      case Constants.MODE_TIME:
        return "h:mm A";
      case Constants.MODE_DATE:
        return "MM/DD/YY";
      default:
        return "MM/DD/YY h:mm A";
    }
  }

  static propTypes = {
    dateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    format: PropTypes.string,
    inputProps: PropTypes.object,
    inputFormat: PropTypes.string,
    defaultText: PropTypes.string,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    direction: PropTypes.string,
    showToday: PropTypes.bool,
    viewMode: PropTypes.string,
    zIndex: PropTypes.number,
    size: PropTypes.oneOf([Constants.SIZE_SMALL, Constants.SIZE_MEDIUM, Constants.SIZE_LARGE]),
    daysOfWeekDisabled: PropTypes.arrayOf(PropTypes.number)
  }

  state = {
      showDatePicker: this.props.mode !== Constants.MODE_TIME,
      showTimePicker: this.props.mode === Constants.MODE_TIME,
      inputFormat: this.resolvePropsInputFormat(),
      buttonIcon: this.props.mode === Constants.MODE_TIME ? "glyphicon-time" : "glyphicon-calendar",
      widgetStyle: {
        display: "block",
        position: "absolute",
        left: -9999,
        zIndex: "9999 !important"
      },
      viewDate: moment(this.props.dateTime, this.props.format, true).startOf("month"),
      selectedDate: moment(this.props.dateTime, this.props.format, true),
      inputValue: typeof this.props.defaultText !== "undefined" ? this.props.defaultText : moment(this.props.dateTime, this.props.format, true).format(this.resolvePropsInputFormat())
  }

  componentWillReceiveProps = (nextProps) => {
    let state = {};
    if (nextProps.inputFormat !== this.props.inputFormat) {
        state.inputFormat = nextProps.inputFormat;
        state.inputValue = moment(nextProps.dateTime, nextProps.format, true).format(nextProps.inputFormat);
    }

    if (nextProps.dateTime !== this.props.dateTime && moment(nextProps.dateTime, nextProps.format, true).isValid()) {
      state.viewDate = moment(nextProps.dateTime, nextProps.format, true).startOf("month");
      state.selectedDate = moment(nextProps.dateTime, nextProps.format, true);
      state.inputValue = moment(nextProps.dateTime, nextProps.format, true).format(nextProps.inputFormat ? nextProps.inputFormat : this.state.inputFormat);
    }
    return this.setState(state);
  }



  onChange = (event) => {
    const value = event.target == null ? event : event.target.value;
    if (moment(value, this.state.inputFormat, true).isValid()) {
      this.setState({
        selectedDate: moment(value, this.state.inputFormat, true),
        viewDate: moment(value, this.state.inputFormat, true).startOf("month")
      });
    }

    return this.setState({
      inputValue: value
    }, function() {
      return this.props.onChange(moment(this.state.inputValue, this.state.inputFormat, true).format(this.props.format), value);
    });

  }

  getValue = () => {
    return moment(this.state.inputValue, this.props.inputFormat, true).format(this.props.format);
  }

  setSelectedDate = (e) => {
    const { target } = e;
    if (target.className && !target.className.match(/disabled/g)) {
      let month;
      if (target.className.indexOf("new") >= 0) month = this.state.viewDate.month() + 1;
      else if (target.className.indexOf("old") >= 0) month = this.state.viewDate.month() - 1;
      else month = this.state.viewDate.month();
      return this.setState({
        selectedDate: this.state.viewDate.clone().month(month).date(parseInt(e.target.innerHTML)).hour(this.state.selectedDate.hours()).minute(this.state.selectedDate.minutes())
      }, function() {
        this.closePicker();
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.state.inputFormat)
        });
      });
    }
  }

  setSelectedHour = (e) => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(parseInt(e.target.innerHTML)).minute(this.state.selectedDate.minutes())
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  }

  setSelectedMinute = (e) => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(this.state.selectedDate.hours()).minute(parseInt(e.target.innerHTML))
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  }

  setViewMonth = (month) => {
    return this.setState({
      viewDate: this.state.viewDate.clone().month(month)
    });
  }

  setViewYear = (year) => {
    return this.setState({
      viewDate: this.state.viewDate.clone().year(year)
    });
  }

  addMinute = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "minutes")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  addHour = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "hours")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  addMonth = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "months")
    });
  }

  addYear = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "years")
    });
  }

  addDecade = () => {
    return this.setState({
      viewDate: this.state.viewDate.add(10, "years")
    });
  }

  subtractMinute = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "minutes")
    }, () => {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  subtractHour = () => {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "hours")
    }, () => {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  }

  subtractMonth = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "months")
    });
  }

  subtractYear = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "years")
    });
  }

  subtractDecade = () => {
    return this.setState({
      viewDate: this.state.viewDate.subtract(10, "years")
    });
  }

  togglePeriod = () => {
    if (this.state.selectedDate.hour() > 12) {
      return this.onChange(this.state.selectedDate.clone().subtract(12, "hours").format(this.state.inputFormat));
    } else {
      return this.onChange(this.state.selectedDate.clone().add(12, "hours").format(this.state.inputFormat));
    }
  }

  togglePicker = () => {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  }

  onClick = () => {
    let classes, gBCR, offset, placePosition, scrollTop, styles;
    if (this.state.showPicker) {
      return this.closePicker();
    } else {
      this.setState({
        showPicker: true
      });
      gBCR = this.refs.dtpbutton.getBoundingClientRect();
      classes = {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      };
      offset = {
        top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
        left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
      };
      offset.top = offset.top + this.refs.datetimepicker.offsetHeight;
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      placePosition = this.props.direction === "up" ? "top" : this.props.direction === "bottom" ? "bottom" : this.props.direction === "auto" ? offset.top + this.refs.widget.offsetHeight > window.offsetHeight + scrollTop && this.refs.widget.offsetHeight + this.refs.datetimepicker.offsetHeight > offset.top ? "top" : "bottom" : void 0;
      if (placePosition === "top") {
        offset.top = -this.refs.widget.offsetHeight - this.clientHeight - 2;
        classes.top = true;
        classes.bottom = false;
        classes["pull-right"] = true;
      } else {
        offset.top = 40;
        classes.top = false;
        classes.bottom = true;
        classes["pull-right"] = true;
      }
      styles = {
        display: "block",
        position: "absolute",
        top: offset.top,
        left: "auto",
        right: 40
      };
      return this.setState({
        widgetStyle: styles,
        widgetClasses: classes
      });
    }
  }

  closePicker = () => {
    let style = {...this.state.widgetStyle};
    style.left = -9999;
    style.display = "none";
    return this.setState({
      showPicker: false,
      widgetStyle: style
    });
  }

  size = () => {
    switch (this.props.size) {
      case Constants.SIZE_SMALL:
        return "form-group-sm";
      case Constants.SIZE_LARGE:
        return "form-group-lg";
    }

    return "";
  }

  renderOverlay = () => {
    const styles = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: `${this.props.zIndex}`
    };
    if (this.state.showPicker) {
      return (<div className='bootstrap-datetimepicker-overlay' onClick={this.closePicker} style={styles} />);
    } else {
      return <span />;
    }
  }

  render() {
    return (
          <div>
            {this.renderOverlay()}
            <DateTimePicker
                  addDecade={this.addDecade}
                  addHour={this.addHour}
                  addMinute={this.addMinute}
                  addMonth={this.addMonth}
                  addYear={this.addYear}
                  daysOfWeekDisabled={this.props.daysOfWeekDisabled}
                  maxDate={this.props.maxDate}
                  minDate={this.props.minDate}
                  mode={this.props.mode}
                  ref="widget"
                  selectedDate={this.state.selectedDate}
                  setSelectedDate={this.setSelectedDate}
                  setSelectedHour={this.setSelectedHour}
                  setSelectedMinute={this.setSelectedMinute}
                  setViewMonth={this.setViewMonth}
                  setViewYear={this.setViewYear}
                  showDatePicker={this.state.showDatePicker}
                  showTimePicker={this.state.showTimePicker}
                  showToday={this.props.showToday}
                  subtractDecade={this.subtractDecade}
                  subtractHour={this.subtractHour}
                  subtractMinute={this.subtractMinute}
                  subtractMonth={this.subtractMonth}
                  subtractYear={this.subtractYear}
                  togglePeriod={this.togglePeriod}
                  togglePicker={this.togglePicker}
                  viewDate={this.state.viewDate}
                  viewMode={this.props.viewMode}
                  widgetClasses={this.state.widgetClasses}
                  widgetStyle={this.state.widgetStyle}
            />
            <div className={"input-group date " + this.size()} ref="datetimepicker">
              <input className="form-control" onChange={this.onChange} type="text" value={this.state.inputValue} {...this.props.inputProps}/>
              <span className="input-group-addon" onBlur={this.onBlur} onClick={this.onClick} ref="dtpbutton">
                <span className={classnames("glyphicon", this.state.buttonIcon)} />
              </span>
            </div>
          </div>
    );
  }
}

