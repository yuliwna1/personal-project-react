import React from "react";
import Card from "./Card";
import renderer from "react-test-renderer";

test("Card component rendered", () => {
  const component = renderer.create(<Card></Card>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
