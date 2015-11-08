import React from "react";
import TestUtils from "react-addons-test-utils";

jest.dontMock("moment");
jest.dontMock("../DateTimeField.js");

describe("DateTimeField", function() {
  const moment = require("moment");
  const DateTimeField = require("../DateTimeField.js");
  const happyDate = moment("1990-06-05 07:30");
  let createParent, TestParent;


  describe("By default", function() {

   it("shows the right date for a given dateTime and inputFormat", function() {
     const component = TestUtils.renderIntoDocument(<DateTimeField dateTime={happyDate.format("x")} />);
     const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");
     expect(input.value).toBe("06/05/90 7:30 AM");
    });

  });

  describe("When changing props", function() {

    beforeEach(() => {
      TestParent = React.createFactory(React.createClass({
        getInitialState() {
          return {
            dateTime: happyDate.format("x"),
            ...this.props
          };
        },

        render() {
          return <DateTimeField {...this.state} />;
        }
      }));
      createParent = (initalState) => TestUtils.renderIntoDocument(TestParent(initalState)); // eslint-disable-line
    });

    it("changes the displayed date when dateTime changes", function() {
      const Parent = createParent();
      const input = TestUtils.findRenderedDOMComponentWithTag(Parent, "input");
      expect(input.value).toBe("06/05/90 7:30 AM");
      Parent.setState({dateTime: moment("1981-06-04 05:45").format("x")});
      expect(input.value).toBe("06/04/81 5:45 AM");
     });

    it("changes the displayed format when inputFormat changes", function() {
      const Parent = createParent();
      const input = TestUtils.findRenderedDOMComponentWithTag(Parent, "input");
      expect(input.value).toBe("06/05/90 7:30 AM");
      Parent.setState({inputFormat: "x"});
      expect(input.value).toBe(happyDate.format("x"));
     });

    it("doesn't change the defaultText if dateTime didn't change", function() {
      const Parent = createParent({defaultText: "Pick a date"});
      const input = TestUtils.findRenderedDOMComponentWithTag(Parent, "input");
      expect(input.value).toBe("Pick a date");
      Parent.setState({});
      expect(input.value).toBe("Pick a date");
    });


  });

});
