export const updatedUser = (user, formData) => {
  if (user.username === formData.username && user.email === formData.email) {
    return {
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  }
  if (user.username === formData.username && user.email !== formData.email) {
    return {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  }
  if (user.email === formData.email && user.username !== formData.username) {
    return {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  } else return formData;
};

export const formatDate = (string) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};
