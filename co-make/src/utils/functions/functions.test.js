import { formatDate, updatedUser } from "./index.js";

const mockUser = {
  first_name: "Patrick",
  last_name: "Replogle",
  email: "fakeuser@gmail.com",
  username: "user1",
  city: "Portland",
  zip_code: "97206",
};
const mockFormData = {
  first_name: "Patrick",
  last_name: "Replogle",
  email: "test@gmail.com",
  username: "user1",
  city: "Seattle",
  zip_code: "98101",
};

const result = {
  email: "test@gmail.com",
  first_name: "Patrick",
  last_name: "Replogle",
  city: "Seattle",
  zip_code: "98101",
};

describe("helper functions", () => {
  test("formatDate function", () => {
    expect(formatDate("2020-06-23T19:21:51.973Z")).toEqual("June 23, 2020");
    expect(formatDate("2019-05-22T12:00:51.973Z")).toEqual("May 22, 2019");
  });

  test("updated user function", () => {
    expect(updatedUser(mockUser, mockFormData)).toEqual(result);
    expect(updatedUser({}, mockFormData)).toEqual(mockFormData);
    expect(
      updatedUser(mockUser, { email: "newEmail@gmail.com" }).email
    ).toEqual("newEmail@gmail.com");
  });
});
