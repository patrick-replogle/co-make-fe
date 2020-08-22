import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { postContext } from "../../contexts/postContext.js";
import ProfileIssueCard from "./ProfileIssueCard";

test("ProfileIssueCard component renders", () => {
  const wrapper = render(
    <Router>
      <postContext.Provider value={{ isEditing: false }}>
        <ProfileIssueCard
          post={{ id: 1, createdAt: Date.now(), title: "test title" }}
        />
      </postContext.Provider>
    </Router>
  );

  expect(wrapper).toBeTruthy();
  expect(wrapper).toBeDefined();
  expect(wrapper.queryByText(/test title/i));
});
