import React from "react";
import TestUtils from "react-addons-test-utils";
import Constants from "../Constants.js";

jest.dontMock("../DateTimePickerHours.js");

describe("DateTimePickerHours", function() {
  const DateTimePickerHours = require("../DateTimePickerHours.js");
  let hours, onSwitchMock, setSelectedHourMock;


  describe("Controls", function() {

    beforeEach(() => {
      setSelectedHourMock = jest.genMockFunction();
      onSwitchMock = jest.genMockFunction();
      hours = TestUtils.renderIntoDocument(
        <DateTimePickerHours
          mode={Constants.MODE_TIME}
          onSwitch={onSwitchMock}
          setSelectedHour={setSelectedHourMock}
         />
      );
    });

    it("calls setSelectedHour when clicking a hour", function() {
      const hour = TestUtils.scryRenderedDOMComponentsWithClass(hours, "hour")[0];
      TestUtils.Simulate.click(hour);
      expect(setSelectedHourMock.mock.calls.length).toBe(1);
     });

    it("calls onSwitch when clicking the switch", function() {
      const switchIcon = TestUtils.findRenderedDOMComponentWithClass(hours, "picker-switch");
      TestUtils.Simulate.click(switchIcon);
      expect(onSwitchMock.mock.calls.length).toBe(1);
     });
  });

  describe("UI", function() {
    beforeEach(() => {
      setSelectedHourMock = jest.genMockFunction();
      onSwitchMock = jest.genMockFunction();
    });

    it("renders the switch if mode is time", function() {
      hours = TestUtils.renderIntoDocument(
        <DateTimePickerHours
          mode={Constants.MODE_TIME}
          onSwitch={onSwitchMock}
          setSelectedHour={setSelectedHourMock}
         />
      );
      const switchList = TestUtils.scryRenderedDOMComponentsWithClass(hours, "list-unstyled");
      expect(switchList.length).toBe(1);
    });

    it("does not render the switch if mode is date", function() {
      hours = TestUtils.renderIntoDocument(
        <DateTimePickerHours
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedHour={setSelectedHourMock}
         />
      );
      const switchList = TestUtils.scryRenderedDOMComponentsWithClass(hours, "list-unstyled");
      expect(switchList.length).toBe(0);
    });

    it("renders 24 Hours", function() {
      hours = TestUtils.renderIntoDocument(
        <DateTimePickerHours
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedHour={setSelectedHourMock}
         />
      );
      const hourList = TestUtils.scryRenderedDOMComponentsWithClass(hours, "hour");
      expect(hourList.length).toBe(24);
    });

    it("renders 01 to 24", function() {
      hours = TestUtils.renderIntoDocument(
        <DateTimePickerHours
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedHour={setSelectedHourMock}
         />
      );
      const hourList = TestUtils.scryRenderedDOMComponentsWithClass(hours, "hour");
      expect(hourList.map((x) => x.textContent)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]);
    });

  });

});
