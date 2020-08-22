import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";

test("Login component renders", () => {
  const { getByText, queryByText } = render(
    <Router>
      <Register />
    </Router>
  );

  expect(queryByText(/Register a New Account/i));
  expect(getByText(/Username/i));
  expect(getByText(/Password/i));
  expect(getByText(/Email/i));
  expect(getByText(/First Name/i));
  expect(getByText(/Last Name/i));
  expect(getByText(/Submit/i));
});
