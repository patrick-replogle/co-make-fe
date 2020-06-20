import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import IssueLink from "./IssueLink";

const mockPost = {
  id: 1,
  title: "Volunteer to feed the homeless",
  description: "We are looking for volunteers",
  city: "Portland",
  zip_code: "97206",
  post_img_url: "www.fakeimage.com",
  votes: 0,
};

test("IssueLink component renders with props", () => {
  const { queryByText } = render(
    <Router>
      <IssueLink post={mockPost} />
    </Router>
  );

  expect(queryByText(/Volunteer to feed the homeless/i));
  expect(queryByText(/Portland/i));
  expect(queryByText(/97206/i));
  expect(queryByText(/votes 0/i));
});
