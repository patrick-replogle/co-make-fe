import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { postContext } from "../../contexts/postContext.js";
import AddPostForm from "./AddPostForm";

test("AddPostForm component renders with correct text if editing is false", () => {
  const { getByText, queryByText } = render(
    <Router>
      <postContext.Provider value={{ isEditing: false }}>
        <AddPostForm />
      </postContext.Provider>
    </Router>
  );

  expect(queryByText(/Add a new Post/i)).toBeTruthy();
  expect(getByText(/Title/i));
  expect(getByText(/Description/i));
  expect(getByText(/Submit/i));
});

test("AddPostForm component renders with correct text if editing is true", () => {
  const { getByText, queryByText } = render(
    <Router>
      <postContext.Provider
        value={{
          isEditing: true,
          postToEdit: {
            id: 1,
            title: "I Need help filling a pothole",
            description: "",
            city: "Portland",
            zip_code: "97206",
            post_image_url: "www.imageurl.com",
          },
        }}
      >
        <AddPostForm />
      </postContext.Provider>
    </Router>
  );

  expect(queryByText(/Edit Your Post/i)).toBeTruthy();
  expect(getByText(/City/i));
  expect(getByText(/Zip Code/i));
});
