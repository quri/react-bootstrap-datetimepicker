jest.dontMock("moment");
import React from "react/addons";
jest.dontMock("../DateTimeField.js");
const { TestUtils } = React.addons;

describe("DateTimeField", function() {
  const moment = require("moment");
  const DateTimeField = require("../DateTimeField.js");
  const happyDate = moment("1990-06-05 07:30");
  let parent, TestParent;

  beforeEach(() => {
    TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return {
          defaultTextA: "Please select a date",
          dateTimeA: happyDate.format("x"),
          defaultTextB: "Please select a date",
          dateTimeB: happyDate.format("x")
        };
      },

      render() {
        return <div>
          <DateTimeField defaultText={this.state.defaultTextA} dateTime={this.state.dateTimeA} inputFormat={this.state.inputFormat}/>
          <DateTimeField defaultText={this.state.defaultTextB} dateTime={this.state.dateTimeB} />
        </div>;
      }
    }));
    parent = TestUtils.renderIntoDocument(TestParent()); // eslint-disable-line
  });

  describe("By default", function() {

   it("shows the right date for a given dateTime and inputFormat", function() {
     var input = TestUtils.scryRenderedDOMComponentsWithTag(parent, "input");
     expect(input[0].getDOMNode().value).toBe("Please select a date");
    });

  });

  describe("When changing props", function() {

   it("changes the displayed date when dateTime changes", function() {
     var input = TestUtils.scryRenderedDOMComponentsWithTag(parent, "input");
     expect(input[0].getDOMNode().value).toBe("Please select a date");
     expect(input[1].getDOMNode().value).toBe("Please select a date");
     parent.setState({dateTimeA: moment("1981-06-04 05:45").format("x")});
     expect(input[0].getDOMNode().value).toBe("06/04/81 5:45 AM");
     expect(input[1].getDOMNode().value).toBe("Please select a date");
    });

   it("changes the displayed format when inputFormat changes", function() {
     var input = TestUtils.scryRenderedDOMComponentsWithTag(parent, "input");
     expect(input[0].getDOMNode().value).toBe("Please select a date");
     parent.setState({dateTimeA: happyDate.format("x"),inputFormat: "x"});
     expect(input[0].getDOMNode().value).toBe(happyDate.format("x"));
    });

  });
});
