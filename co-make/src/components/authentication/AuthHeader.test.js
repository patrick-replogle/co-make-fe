import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthHeader from "./AuthHeader";

test("AuthHeader component renders", () => {
  const { getByText, queryByText } = render(
    <Router>
      <AuthHeader />
    </Router>
  );

  expect(getByText(/coMake/i)).toBeDefined();
  expect(queryByText(/login/i)).toBeDefined();
  expect(queryByText(/register/i)).toBeDefined();
});
