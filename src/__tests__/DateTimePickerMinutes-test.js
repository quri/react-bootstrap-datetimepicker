import React from "react";
import TestUtils from "react-addons-test-utils";
import Constants from "../Constants.js";

jest.dontMock("../DateTimePickerMinutes.js");

describe("DateTimePickerMinutes", function() {
  const DateTimePickerMinutes = require("../DateTimePickerMinutes.js");
  let minutes, onSwitchMock, setSelectedMinuteMock;


  describe("Controls", function() {

    beforeEach(() => {
      setSelectedMinuteMock = jest.genMockFunction();
      onSwitchMock = jest.genMockFunction();
      minutes = TestUtils.renderIntoDocument(
        <DateTimePickerMinutes
          mode={Constants.MODE_TIME}
          onSwitch={onSwitchMock}
          setSelectedMinute={setSelectedMinuteMock}
         />
      );
    });

    it("calls setSelectedMinute when clicking a minute", function() {
      const minute = TestUtils.scryRenderedDOMComponentsWithClass(minutes, "minute")[0];
      TestUtils.Simulate.click(minute);
      expect(setSelectedMinuteMock.mock.calls.length).toBe(1);
     });

    it("calls onSwitch when clicking the switch", function() {
      const switchIcon = TestUtils.findRenderedDOMComponentWithClass(minutes, "picker-switch");
      TestUtils.Simulate.click(switchIcon);
      expect(onSwitchMock.mock.calls.length).toBe(1);
     });
  });

  describe("UI", function() {
    beforeEach(() => {
      setSelectedMinuteMock = jest.genMockFunction();
      onSwitchMock = jest.genMockFunction();
    });

    it("renders the switch if mode is time", function() {
      minutes = TestUtils.renderIntoDocument(
        <DateTimePickerMinutes
          mode={Constants.MODE_TIME}
          onSwitch={onSwitchMock}
          setSelectedMinute={setSelectedMinuteMock}
         />
      );
      const switchList = TestUtils.scryRenderedDOMComponentsWithClass(minutes, "list-unstyled");
      expect(switchList.length).toBe(1);
    });

    it("does not render the switch if mode is date", function() {
      minutes = TestUtils.renderIntoDocument(
        <DateTimePickerMinutes
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedMinute={setSelectedMinuteMock}
         />
      );
      const switchList = TestUtils.scryRenderedDOMComponentsWithClass(minutes, "list-unstyled");
      expect(switchList.length).toBe(0);
    });

    it("renders 12 different Minutes", function() {
      minutes = TestUtils.renderIntoDocument(
        <DateTimePickerMinutes
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedMinute={setSelectedMinuteMock}
         />
      );
      const minuteList = TestUtils.scryRenderedDOMComponentsWithClass(minutes, "minute");
      expect(minuteList.length).toBe(12);
    });

    it("renders 01 to 24", function() {
      minutes = TestUtils.renderIntoDocument(
        <DateTimePickerMinutes
          mode={Constants.MODE_DATE}
          onSwitch={onSwitchMock}
          setSelectedMinute={setSelectedMinuteMock}
         />
      );
      const minuteList = TestUtils.scryRenderedDOMComponentsWithClass(minutes, "minute");
      expect(minuteList.map((x) => x.textContent)).toEqual(["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]);
    });

  });

});
