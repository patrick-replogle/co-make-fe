import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ImageUpload from "./ImageUpload";

test("ImageUpload component renders", () => {
  const wrapper = render(
    <Router>
      <ImageUpload />
    </Router>
  );

  expect(wrapper.queryByText(/Upload/i));
});
