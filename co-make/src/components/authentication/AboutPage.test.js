import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AboutPage from "./AboutPage";

test("AboutPage component renders", () => {
  const wrapper = render(
    <Router>
      <AboutPage />
    </Router>
  );

  expect(wrapper).toBeDefined();
  expect(wrapper.queryAllByText(/coMake/i));
  expect(wrapper.queryByText(/login/i));
  expect(wrapper.queryByText(/register/i));
  expect(wrapper.queryByText(/what is coMake/i));
});
