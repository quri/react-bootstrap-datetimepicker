import React, { Component } from "react";
import ReactDOM from "react-dom";
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from "moment";
import ParentComponent from "./ParentComponent";

class Basic extends Component {

	render() {
    return (
          <div className="container">
						<div className="row">
							<div className="col-xs-12">
								<h1>React Bootstrap DateTimePicker</h1>
								This project is a port of <a href="https://github.com/Eonasdan/bootstrap-datetimepicker">https://github.com/Eonasdan/bootstrap-datetimepicker</a> for React.js
							</div>
						</div>
            <div className="row">
              <div className="col-xs-12">
                Controlled Component example
                <ParentComponent />
                <pre>
                  {`class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }

  handleChange = (newDate) => {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  }

  render() {
    const {date, format, mode, inputFormat} = this.state;
    return <DateTimeField
      dateTime={date}
      format={format}
      viewMode={mode}
      inputFormat={inputFormat}
      onChange={this.handleChange}
    />;
  }
}`}
                </pre>
              </div>
            </div>
              <div className="row">
                <div className="col-xs-12">
                  Example with default Text
                  <DateTimeField
                    defaultText="Please select a date"
                  />
                  <pre> {'<DateTimeField defaultText="Please select a date" />'} </pre>
                </div>
              </div>
            <div className="row">
							<div className="col-xs-12">
								Default Basic Example
								<DateTimeField />
								<pre> {'<DateTimeField />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								Example with default Text
								<DateTimeField
									defaultText="Please select a date"
								/>
								<pre> {'<DateTimeField defaultText="Please select a date" />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                ViewMode set to years view with custom inputFormat
                <DateTimeField
                  inputFormat='DD-MM-YYYY'
                  viewMode='years'
                />
                <pre> {'<DateTimeField viewMode="years" inputFormat="DD-MM-YYYY" />'} </pre>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                daysOfWeekDisabled
                <DateTimeField
                  daysOfWeekDisabled={[0, 1, 2]}
                />
                <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

              </div>
						</div>
						<div className="row">
							<div className="col-xs-12">
                minDate and maxDate
                <DateTimeField
                  maxDate={moment().add(1, "days")}
                  minDate={moment().subtract(1, "days")}
                />
                <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

              </div>
						</div>
            <div className="row">
              <div className="col-xs-12">
                  just time picker
                  <DateTimeField
                      mode="time"
                      />
                  <pre> {'<DateTimeField mode="time" />'} </pre>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                  just date picker
                  <DateTimeField
                      mode="date"
                      />
                  <pre> {'<DateTimeField mode="date" />'} </pre>
              </div>
            </div>
          </div>
      );
   }
}

ReactDOM.render(React.createFactory(Basic)(), document.getElementById("example"));
