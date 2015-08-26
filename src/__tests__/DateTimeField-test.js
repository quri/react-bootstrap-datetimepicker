jest.dontMock("moment");
import React from "react/addons";
jest.dontMock("../DateTimeField.js");
const { TestUtils } = React.addons;

describe("DateTimeField", function() {
  const moment = require("moment");
  const DateTimeField = require("../DateTimeField.js");
  let parent, TestParent;

  beforeEach(() => {
    TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { dateTime: moment("1990-06-05 07:30").format("x") };
      },

      render() {
        return <DateTimeField dateTime={this.state.dateTime} />;
      }
    }));
    parent = TestUtils.renderIntoDocument(TestParent()); // eslint-disable-line
  });

  describe("By default", function() {

   it("shows the right date for a given dateTime and inputFormat", function() {
     const input = TestUtils.findRenderedDOMComponentWithTag(parent, "input");
     expect(input.getDOMNode().value).toBe("06/05/90 7:30 AM");
    });

  });

  describe("When changing props", function() {

   it("changes the displayed date when dateTime changes", function() {
     const input = TestUtils.findRenderedDOMComponentWithTag(parent, "input");
     expect(input.getDOMNode().value).toBe("06/05/90 7:30 AM");
     parent.setState({dateTime: moment("1981-06-04 05:45").format("x")});
     expect(input.getDOMNode().value).toBe("06/04/81 5:45 AM");
    });

  });
});
