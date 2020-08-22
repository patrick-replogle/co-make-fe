import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from "./WelcomePage";

test("Login component renders", () => {
  const { getByText, queryByText } = render(
    <Router>
      <WelcomePage />
    </Router>
  );

  expect(queryByText(/coMake/i));
  expect(getByText(/Get Involved/i));
  expect(getByText(/Register/i));
  expect(getByText(/Login/i));
});
