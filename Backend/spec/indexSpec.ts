import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
import  { myFunc, fullName } from "../src/index.js";

describe("Example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});



it("expect myFunc(5) to equal 25", () => {
  expect(myFunc(10)).toEqual(100);
});

it("Check FullNAme", () => {
  expect(fullName("Ahmed", "Magdy")).toEqual("Ahmed Magdy");
});