import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { postContext } from "../../contexts/postContext.js";
import UserPosts from "./UserPosts";

const mockData = [{ id: 1, title: "test post" }];

test("UserPosts component renders with props", () => {
  const wrapper = render(
    <Router>
      <postContext.Provider value={{ setIsEditing: false }}>
        <UserPosts userPosts={mockData} />
      </postContext.Provider>
    </Router>
  );

  expect(wrapper).toBeTruthy();
  expect(wrapper).toBeDefined();
  expect(wrapper.queryByText(/You have 1 active posts/i));
  expect(wrapper.queryByText(/test post/i));
});
