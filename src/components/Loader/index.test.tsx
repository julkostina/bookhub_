import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./index";
import "@testing-library/jest-dom/extend-expect";

test("renders loader correctly", () => {
  const { container } = render(<Loader />);
  expect(container).toMatchSnapshot();
});
