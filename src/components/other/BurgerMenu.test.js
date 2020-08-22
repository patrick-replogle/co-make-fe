import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

test("BurgerMenu component renders", () => {
  const wrapper = render(
    <Router>
      <BurgerMenu />
    </Router>
  );

  expect(wrapper).toBeTruthy();
  expect(wrapper).toBeDefined();
  expect(wrapper.queryByText(/Logout/i));
  expect(wrapper.findByText(/View Profile/i));
  expect(wrapper.findByText(/Home/i));
});
